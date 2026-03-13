<?php

namespace App;

use Predis\Client;

class RedisService
{
    private ?Client $client = null;

    private function getConfig(): array
    {
        return [
            'host'     => getenv('REDIS_HOST') ?: 'localhost',
            'port'     => (int)(getenv('REDIS_PORT') ?: 6379),
            'database' => (int)(getenv('REDIS_DB') ?: 0),
            'username' => getenv('REDIS_USERNAME') ?: 'default',
            'password' => getenv('REDIS_PASSWORD') ?: '',
        ];
    }

    public function connect(): Client
    {
        if ($this->client === null) {
            $this->client = new Client($this->getConfig());
        }
        return $this->client;
    }

    public function incrementVisitor(): int
    {
        $client = $this->connect();
        return (int) $client->incr('portfolio:visitor_count');
    }

    public function getVisitorCount(): int
    {
        $client = $this->connect();
        $count = $client->get('portfolio:visitor_count');
        return (int) ($count ?? 0);
    }

    public function setCache(string $key, string $value, int $ttl = 3600): void
    {
        $client = $this->connect();
        $client->setex("portfolio:cache:{$key}", $ttl, $value);
    }

    public function getCache(string $key): ?string
    {
        $client = $this->connect();
        $result = $client->get("portfolio:cache:{$key}");
        return $result ?: null;
    }

    public function logVisit(string $ip, string $userAgent): void
    {
        $client = $this->connect();
        $data = json_encode([
            'ip' => $ip,
            'ua' => $userAgent,
            'time' => date('Y-m-d H:i:s'),
        ]);
        $client->lpush('portfolio:visit_log', [$data]);
        $client->ltrim('portfolio:visit_log', 0, 999);
    }

    public function getRecentVisits(int $count = 10): array
    {
        $client = $this->connect();
        $visits = $client->lrange('portfolio:visit_log', 0, $count - 1);
        return array_map(fn($v) => json_decode($v, true), $visits);
    }
}
