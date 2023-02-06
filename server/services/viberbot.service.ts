export const postMessage = (message: string) => {
  return fetch(
    'https://chatapi.viber.com/pa/broadcast_message', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Viber-Auth-Token': '4c8d3ca5fe400d8c-375a0c96423f4e88-20226fa4e1456cf5'
      },
      body: JSON.stringify({
        broadcast_list:[
          'T7ZOndq3o1XJWs/NYQz+Kw==',
          'g/8hrePW4LMcBMmlOAKYUw=='
        ],
        sender:{
          name: 'HomeBot',
          avatar: 'https://freepik.cdnpk.net/img/favicons/apple-icon-144x144.png?v=2018082101'
        },
        type: 'text',
        text: message
      })
    }
  )
    .then((res) => res.json())
}