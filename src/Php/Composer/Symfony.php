<?php

/*
 * This file is part of the Distribution library.
 *
 * Copyright (c) 2015-2016 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\Distribution\Php\Composer;

use Symfony\Component\Filesystem\Filesystem;

/**
 * Composer scripts to Symfony Standard project.
 *
 * @author Beñat Espiña <benatespina@gmail.com>
 */
final class Symfony
{
    /**
     * Static method that creates .htaccess, files if they do not exist.
     */
    public static function installRequiredFiles()
    {
        $htaccess = [
            __DIR__ . '/../../../../../../app/.htaccess',
            __DIR__ . '/../../../../../../src/.htaccess',
            __DIR__ . '/../../../../../../web/.htaccess',
        ];
        $fileSystem = new Filesystem();

        try {
            if (false === $fileSystem->exists($htaccess)) {
                $fileSystem->copy($htaccess[0] . '.dist', $htaccess[0]);
                $fileSystem->copy($htaccess[1] . '.dist', $htaccess[1]);
                $fileSystem->copy($htaccess[2] . '.dist', $htaccess[2]);
            }
        } catch (\Exception $exception) {
            echo sprintf("Something wrong happens during process: \n%s\n", $exception->getMessage());
        }
    }
}
