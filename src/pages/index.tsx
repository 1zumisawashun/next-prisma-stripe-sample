import { AnchorButton, Button, Loading } from '../components'

export default function page() {
  return (
    <div className="pb-12 pt-32 md:pb-20 md:pt-40">
      <div className="pb-12 text-center md:pb-16">
        <h1 className="mb-4 text-7xl font-extrabold tracking-tighter md:text-8xl">
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Boox Mix!
          </span>
        </h1>
        <div className="gap-container">
          <p className="mb-8 text-xl">Make book playlists you like!</p>
          <div className="flex-gap-container">
            <Button size="small">sample</Button>
            <Button size="medium">sample</Button>
            <Button size="large">sample</Button>

            <AnchorButton href="/books">Find Books1</AnchorButton>
            <AnchorButton href="/books">Find Books2</AnchorButton>
          </div>
          <div className="flex-gap-container">
            <Button size="small" loading>
              sample
            </Button>
            <Button size="medium" loading>
              sample
            </Button>
            <Button size="large" loading>
              sample
            </Button>
          </div>

          <div className="flex-gap-container">
            <Button size="small" disabled>
              sample
            </Button>
            <Button size="medium" disabled>
              sample
            </Button>
            <Button size="large" disabled>
              sample
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
