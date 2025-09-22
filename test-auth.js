
// Simple test script to verify auth endpoints
async function testAuth() {
  console.log('Testing authentication system...')
  
  // Test user registration
  try {
    console.log('\n1. Testing user registration...')
    const registerResponse = await fetch('http://localhost:5001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpass123'
      }),
    })

    const registerData = await registerResponse.json()
    console.log('Register response:', registerData)

    if (registerData.success) {
      console.log('✅ Registration successful')
      console.log('Token:', registerData.token)
      console.log('User:', registerData.user)
    } else {
      console.log('❌ Registration failed:', registerData.message)
    }
  } catch (error) {
    console.log('❌ Registration error:', error.message)
  }

  // Test user login
  try {
    console.log('\n2. Testing user login...')
    const loginResponse = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpass123'
      }),
    })

    const loginData = await loginResponse.json()
    console.log('Login response:', loginData)

    if (loginData.success) {
      console.log('✅ Login successful')
      console.log('Token:', loginData.token)
      
      // Test protected route
      console.log('\n3. Testing protected route...')
      const meResponse = await fetch('http://localhost:5001/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${loginData.token}`
        }
      })

      const meData = await meResponse.json()
      console.log('Me response:', meData)

      if (meData.success) {
        console.log('✅ Protected route works')
        console.log('User data:', meData.data)
      } else {
        console.log('❌ Protected route failed:', meData.message)
      }
    } else {
      console.log('❌ Login failed:', loginData.message)
    }
  } catch (error) {
    console.log('❌ Login error:', error.message)
  }
}

// Run the test
testAuth().catch(console.error)
