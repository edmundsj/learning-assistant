module.exports = {
    blueprint: sequence([
        modifyFile('.gitignore', [
            ignoreSection('Mac', dedent`
                # For those annoying Mac files
                /.DS_Store
            `),

            ignoreSection('Linux', dedent`
                # For those annoying linux files
                *.swp
            `),

            ignoreSection('Misc', dedent`
                # For generic log files
                /*.log
            `),

            ignoreSection('Node', dedent`
                # For node dependencies
                /node_modules/
            `),

            ignoreSection('Next', dedent`
                # Next.js
                /.next/
                /out/
                next-env.d.ts
            `),

            ignoreSection('Yarn', dedent`
                # For Yarn versions 2 and higher
                # From https://stackoverflow.com/a/60184331
                /.pnp.*
                /.yarn/*
                /.yarn/install-state.gz
                !/.yarn/patches
                !/.yarn/plugins
                !/.yarn/releases
                !/.yarn/sdks
                !/.yarn/versions
                yarn-debug.log*
                yarn-error.log*
                /.pnp
                .pnp.js
            `),
            ignoreSection('npm', dedent`
                npm-debug.log*
                .pnpm-debug.log*
            `),

            ignoreSection('Typescript', dedent`
                # For Typescript
                # Temp and build files
                /.tscache/
                /*.tmp.*
                /.eslintcache
                /*.tsbuildinfo
            `),

            ignoreSection('Jest', dedent`
                # For Jest artifacts
                /coverage/
            `),

            ignoreSection('Build artifacts', dedent`
                # Build output for this project
                dist/
                build/
            `),
            ignoreSection('Vercel', dedent`
                # vercel
                .vercel
            `),

            ignoreSection('npx link', dedent`
                # For locally linked dependencies using \`npx link\`
                # See https://www.npmjs.com/package/link
                /link.config.json
            `),

            ignoreSection('Secrets', dedent`
                # local env files
                .env*.local
                .env
                .secrets.ini
                *.secrets
            `),
            ignoreSection('Environments', dedent`
                .env
                .venv
                env/
                venv/
                ENV/
                env.bak/
                venv.bak/
            `),
        ]),
    ]),
};
