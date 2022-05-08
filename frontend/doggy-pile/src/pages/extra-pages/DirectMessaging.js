import './Doggy101.scss'
import Script from '@gumgum/react-script-tag'
import { useEffect } from 'react'



function DirectMessaging() {

  // useEffect(() => {
  //   // const scriptTag1 = document.createElement('script')
  //   // scriptTag1.src = "http://localhost:3001/socket.io/socket.io.js"
  //   // scriptTag1.defer = true
  //   // scriptTag1.type = "text/javascript"
  //   // document.body.appendChild(scriptTag1)
  //   const scriptTag2 = document.createElement('script')
  //   scriptTag2.src = "messagingScript.js"
  //   scriptTag2.defer = true
  //   scriptTag2.type = "text/javascript"
  //   document.body.appendChild(scriptTag2)
  // }, [])

  return (
    <div>
      {/* <Script defer src="http://localhost:3001/socket.io/socket.io.js" type="text/javascript" /> */}
      {/* <Script defer src="messagingScript.js" type="text/javascript" /> */}
      <div className="message-container"></div>
      <form id="send-message-form">
        <input type="text" id="send-message-input" />
        <button type="submit" id="send-message-submit">Send</button>
      </form>
    </div>
  )
}


export default DirectMessaging;