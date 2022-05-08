const token = localStorage.getItem("token");
export const getMethod: RequestInit = {
    method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
      },
      redirect: 'follow',
}

const accessToken = localStorage.getItem("accessToken");
export const spotifyGetMethod: RequestInit = {
    method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
      },
      redirect: 'follow',
}