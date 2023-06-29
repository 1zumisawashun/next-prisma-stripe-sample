import { ButtonLink } from '../components/uis'

const Home = () => {
  return (
    <div className="pb-12 pt-32 md:pb-20 md:pt-40">
      <div className="pb-12 text-center md:pb-16">
        <h1 className="leading-tighter mb-4 text-7xl font-extrabold tracking-tighter md:text-8xl">
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            BUKUMA
          </span>
        </h1>
        <div className="mx-auto max-w-3xl">
          <p className="mb-8 text-xl">Bookmark articles you like!</p>
          <div className="flexjustify-center mt-5">
            <div className="mt-3">
              <ButtonLink href="/articles">Find Articles</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
