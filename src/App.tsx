import { Box, Container, createTheme, CssBaseline, TextField, InputLabel, ThemeProvider, Button } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import CountDownTimer from "./Components/CountDownTimer"
import { words } from "./words"

function App() {
  const { register, handleSubmit, reset, watch, } = useForm({
    defaultValues: {
      word: ''
    }
  })
  const [currentWord, currentWordSetter] = useState('')
  const [score, scoreSetter] = useState(0)
  const [timeout, timeoutSetter] = useState(false)
  const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Poppins"',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  })
  const timeoutCallback = (timeout: any) => {
    timeoutSetter(timeout)
  }
  /**
   * [reference](https://stackoverflow.com/a/43235785/11587161)
   */
  const getHighlightedText = (text: string, highlight: string) => {
      const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
      return <span> { parts.map((part, i) => 
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { color: '#f73378' } : {} }>
              { part }
          </span>)
      } </span>
  }
  const onSubmit = (data: any) => {
    if(currentWord.toLocaleLowerCase() === data.word.toLocaleLowerCase()) scoreSetter(prev => prev+1)
    currentWordSetter(words[Math.floor(Math.random() * words.length)])
    reset()
  }

  useEffect(() => {
    currentWordSetter(words[Math.floor(Math.random() * words.length)])
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box minHeight="100vh">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel style={{ userSelect: 'none' }}>
            <Container maxWidth="xl">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" fontSize="2rem">
                  Score <Box color="secondary.main" marginLeft={2} fontWeight="bold" fontSize="3rem">{score}</Box>
                </Box>
                <Box display="flex" alignItems="center" fontSize="2rem">
                    Timeleft
                  <Box color="secondary.main" marginLeft={2} fontWeight="bold" fontSize="3rem"><CountDownTimer hours={0} showHours={false} minutes={1} seconds={0} timeoutSetter={timeoutCallback}/></Box>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center" fontSize="4rem">
                <Box>
                  {timeout ? (
                    <Box textAlign="center" marginTop="9rem" >
                      <Box>Horee!! Selamat, kamu hebat!</Box>
                      <Box fontSize="2rem">kecepatan mengetik kamu adalah <b style={{ color: '#f73378' }}>{score}</b> kata per menit.</Box>
                      <Button color="secondary" onClick={() => window.location.reload()} variant="outlined">Mulai Lagi</Button>
                    </Box>
                  ) : (
                    <Box marginTop="4rem">
                      <h1>{getHighlightedText(currentWord, watch('word'))}</h1>
                      <TextField {...register('word')} color="secondary" disabled={timeout} autoFocus fullWidth placeholder="Ketik huruf yang muncul diatas..." />
                    </Box>
                  )}
                </Box>
              </Box>
            </Container>
          </InputLabel>
        </form>
      </Box>
    </ThemeProvider>
  )
}

export default App
