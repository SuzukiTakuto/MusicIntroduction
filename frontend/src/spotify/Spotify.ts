export const  authEndpoint = "https://accounts.spotify.com/authorize";


const redirectUri = "http://localhost:3000/";

const clientId = "";

// 対応する範囲を決める
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

type Initial = {
    [key: string]: string
};

export const getTokenFromUrl = () => {
  return window.location.hash //location.hashはurlの#以降を取得
    .substring(1)   //2文字目以降を取得する(つまり#より後の文字)
    .split('&')     //&で区切られた部分で文字列配列を作る
    .reduce((initial: Initial, item) => {  //reduceは最終的に配列を一つの値にして返す、第一引数は累積値で第二引数が現在処理する値、今回の場合は配列をオブジェクトにしてる
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial
    }, {});
}


// SpotifyのログインページのURL
export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;