<?php

/*
 * This file is part of the Distribution package.
 *
 * Copyright (c) 2015-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\Distribution\Php\Symfony;

use LIN3S\Distribution\Php\Symfony\DependencyInjection\Compiler\TwigExtensionsPass;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

/**
 * LIN3S distribution bundle kernel class.
 *
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class Lin3sDistributionBundle extends Bundle
{
    public function build(ContainerBuilder $container)
    {
        $container->addCompilerPass(new TwigExtensionsPass());
    }
}
