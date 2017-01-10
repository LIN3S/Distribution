<?php

/*
 * This file is part of the Distribution package.
 *
 * Copyright (c) 2015-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\Distribution\Php\Symfony\DependencyInjection\Compiler;;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class TwigExtensionsPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasDefinition('twig_extension.webpack')) {
            return;
        }

        $config = $container->getParameter('lin3s_distribution.config');
        $container->getDefinition('twig_extension.webpack')->setArgument(0, $config['webpack']['manifest_path']);
    }
}
