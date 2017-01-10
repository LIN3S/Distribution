<?php

/*
 * This file is part of the Distribution package.
 *
 * Copyright (c) 2015-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace LIN3S\Distribution\Php\Symfony\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * LIN3S distribution bundle configuration class.
 *
 * @author Beñat Espiña <benatespina@gmail.com>
 */
class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $treeBuilder->root('lin3s_distribution')
            ->children()
                ->arrayNode('webpack')
                    ->children()
                        ->scalarNode('manifest_path')
                            ->defaultValue("%kernel.root_dir%/../manifest.json")
                        ->end()
                    ->end()
                ->end()
            ->end();

        return $treeBuilder;
    }
}
