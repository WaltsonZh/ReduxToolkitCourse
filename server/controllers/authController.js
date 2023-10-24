const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body

  // check for username and password
  if (!user || !pwd) return res.status(400).json({ message: 'Username and password are required.' })

  // find the user
  const foundUser = await User.findOne({ username: user }).exec()
  if (!foundUser) return res.sendStatus(401)

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password)
  if (match) {
    const roles = Object.values(foundUser.roles)

    // create JWTs (JSON web tokens)
    const accessToken = jwt.sign(
      {
        UserInfo: { username: foundUser.username },
        roles,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10s' }
    )
    const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15s' })

    // saving refreshToken with current user
    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()
    console.log(result)

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
    res.json({ accessToken })
  } else {
    res.sendStatus(401)
  }
}

module.exports = { handleLogin }
