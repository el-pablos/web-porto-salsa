<?php

require_once __DIR__ . '/../vendor/autoload.php';

// Load .env if exists
$envFile = __DIR__ . '/../../.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (str_starts_with(trim($line), '#')) continue;
        if (str_contains($line, '=')) {
            putenv(trim($line));
        }
    }
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

use App\RedisService;

$redis = new RedisService();
$action = $_GET['action'] ?? 'count';

try {
    switch ($action) {
        case 'increment':
            $count = $redis->incrementVisitor();
            $redis->logVisit(
                $_SERVER['REMOTE_ADDR'] ?? 'unknown',
                $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
            );
            echo json_encode(['success' => true, 'count' => $count]);
            break;

        case 'count':
            $count = $redis->getVisitorCount();
            echo json_encode(['success' => true, 'count' => $count]);
            break;

        default:
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Unknown action']);
    }
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Service unavailable']);
}
