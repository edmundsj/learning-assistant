const { gitignore } = require('.pjt/gigitnore.cjs')
const { sequence, makeDirectory, modifyFile } = require('@projitect/projitect/blueprint');
const { literal, markdownSection, ignoreSection } = require('@projitect/projitect/filemods');
const { dedent } = require('ts-dedent');
const { default: exampleBlueprintUsingImport} = require('@projitect/example-blueprint/using-import');
const exampleBlueprintUsingRequire = require('@projitect/example-blueprint/using-require');
const {default: gitignoreBlueprint} = require('.pjt/gitignore.cjs')

module.exports = {
    options: {},

    blueprint: sequence([

        modifyFile('README.md', markdownSection(
            'Hello from pjt',
            'Hello from @projitect!',
        )),
        makeDirectory('src/', sequence([
            makeDirectory('blueprint-using-require/', sequence([
                exampleBlueprintUsingRequire('example-project')
            ])),

            makeDirectory('blueprint-using-import/', sequence([
                exampleBlueprintUsingImport('example-project')
            ])),
        ])),
        gitignoreBlueprint,

        modifyFile('README.md', markdownSection(
            'circlecistatus',
            `[![CircleCI](https://dl.circleci.com/status-badge/img/gh/projitect/example-project/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/projitect/example-project/tree/main)`
        )),

    ]),
};
