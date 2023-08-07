# devth.com

## Requirements

- Write posts in markdown
- Ability to render React components in posts
- Animated page transitions
- Server side rendering (or static export)
- Shift-K to nav to any page
- Super fast
- Default branch deploys to production automatically
- Respect system dark / light mode

## Deployment

After having run the `create-remix` command and selected "Vercel" as a
deployment target, you only need to [import your Git
repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory
by running [Vercel CLI](https://vercel.com/cli):

```sh
yarn global add vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will
then automatically be deployed by Vercel, through its [Git
Integration](https://vercel.com/docs/concepts/git).

## Development

To run your Remix app locally, make sure your project's local dependencies are
installed:

```sh
yarn
```

Afterwards, start the Remix development server like so:

```sh
yarn dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready
to go!

If you're used to using the `vercel dev` command provided by [Vercel
CLI](https://vercel.com/cli) instead, you can also use that, but it's not
needed.
