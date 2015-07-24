<?php

/*
 * This file is part of the Distribution library.
 *
 * Copyright (c) 2015 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\Distribution\Composer;

use Symfony\Component\Filesystem\Filesystem;
use Composer\Script\CommandEvent;

/**
 * Composer scripts to Wordpress Standard project.
 *
 * @author Beñat Espiña <benatespina@gmail.com>
 */
final class WordpressStandard
{
    /**
     * Static method that creates .htaccess, robots.txt and wp-config-custom.php files if they do not exist.
     */
    public static function createRequiredFiles()
    {
        $htaccess = __DIR__ . '/../../../../../.htaccess';
        $robots = __DIR__ . '/../../../../../robots.txt';
        $wpConfig = __DIR__ . '/../../../../../wp-config-custom';
        $fileSystem = new Filesystem();

        try {
            if (false === $fileSystem->exists($htaccess)) {
                $fileSystem->copy($htaccess . '.dist', $htaccess);
            }
            if (false === $fileSystem->exists($robots)) {
                $fileSystem->copy($robots . '.dist', $robots);
            }
            if (false === $fileSystem->exists($wpConfig)) {
                $fileSystem->copy($wpConfig . '-sample.php', $wpConfig . '.php');
            }
        } catch (\Exception $exception) {
            echo sprintf("Something wrong happens during process: \n%s\n", $exception->getMessage());
        }
    }
}
