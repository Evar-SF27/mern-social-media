import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import NavBar from 'components/navbar'
import UserWidget from 'components/widgets/userWidget'
import MyPostWidget from 'components/widgets/myPostWidget'
import PostsWidget from 'components/widgets/postsWidget'
import AdvertWidget from 'components/widgets/advertWidget'
import FriendListWidget from 'components/widgets/friendListWidget'

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)")
  const { _id, picturePath } = useSelector((state) => state.user)
  console.log("Pic", picturePath)

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding={isNonMobileScreens ? "2rem 3%" : "2rem 10%"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage
