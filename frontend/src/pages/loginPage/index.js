import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import Form from './form'

const LoginPage = () => {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)")
    return (
      <Box>
        <Box
          width="100%"
          backgroundcolor={theme.palette.background.alt}
          p="1rem 6%"
          textAlign="center"
        >
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            MERN Social
          </Typography>
        </Box>
        <Box
          width={isNonMobileScreens ? "60%" : "80%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
            <Typography fontWeight="500" variant="h3" textAlign="center" sx={{ mb: "4rem" }}>
              Welcome to the MERN Social Media
            </Typography>
            <Form />
        </Box>
      </Box>
    )
  }
  
  export default LoginPage