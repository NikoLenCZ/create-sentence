import { SentenceForm } from './components/SentenceForm/SentenceForm'
import { SentenceList } from './components/SentenceList/SentenceList'
import { Title } from './components/Title/Title'

export const App = () => {
  return (
    <>
      <Title />
      <SentenceForm />
      <SentenceList />
    </>
  )
}