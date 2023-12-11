// 変数・定数を宣言するときはコードの上部に記述するのが一般的

// 変数の初期化
 let untyped = '';
 let typed = '';
 let score = 0;

 
 // 必要なHTML要素の取得
 const untypedfield = document.getElementById('untyped');
 const typedfield = document.getElementById('typed');
 const wrap = document.getElementById('wrap');
 const start = document.getElementById('start');
 const count = document.getElementById('count');

//  getElementById()メソッド：id属性を指定することで、合致するHTML要素を取得できる



/* --変数宣言--
画面に表示する文字列を入れる変数（ここではuntypedという名前にする）を準備する
getElementById()メソッドでHTML要素（ここではuntypedfieldという名前にする）を取得する
   --関数createText--
配列textListsの0番目（textLists[0]）をuntypedに代入する
変数untypedを定数untypedfieldのtextContentプロパティに代入する→画面に表示される */
 

 // 複数のテキストを格納する配列
  const textLists = [
    'Hello World','This is my App','How are you?',
    'Today is sunny','I love JavaScript!','Good morning',
    'I am Japanese','Let it be','Samurai',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch',
    'var let const','Windows Mac Linux iOS Android',
    'programming'
  ];
  
// ランダムなテキストを表示    //const createText = () => {};
const createText = () => {

   // 正タイプした文字列をクリア
   typed = '';
   typedfield.textContent = typed;

  // 配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);
/*
Math.random(); メソッド：「0以上1未満の小数点以下の値」をランダムに取得できる
Math.floor()メソッド：小数点以下を切り捨てる
Math.ceil()メソッド：小数点以下を切り上げる
Math.random()メソッドとMath.floor()メソッドを組み合わせることで、配列の要素をランダムに取得できる→テキストをランダムにブラウザに表示できる
*/

  // 配列からランダムにテキストを取得し画面に表示する
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

 
 // キー入力の判定    //const keyPress = e => {};
 const keyPress = e => {
     // 誤タイプの場合
    //  関数keyPress・入力された文字（e.key）と変数untypedの先頭文字を比較し、不一致の場合は処理を終了（return）する
    // substring()メソッドでテキストの先頭文字を抽出し、入力された文字と比較する
     if(e.key !== untyped.substring(0, 1)) {
      wrap.classList.add('mistyped');

     // 100ms後に背景色を元に戻す
     setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);

      return;
    }
/*
classList.add()メソッドでclass属性（mistyped）を追加し、背景色を変更する
classList.remove()メソッドでclass属性（mistyped）を削除し、背景色を元に戻す
classList.toggle()、4.class属性を切り替えるメソッド
*/
    // 正タイプの場合
       // スコアのインクリメント
   score++;
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

     // テキストがなくなったら新しいテキストを表示
     if(untyped === '') {
      createText();
    }
};

 // タイピングスキルのランクを判定   //  const rankCheck = score => {};
 const rankCheck = score => {
 
  // --スコアの値を返す
  // --return `${score}文字打てました!`;

     // テキストを格納する変数を作る
     let text = '';
  
     // スコアに応じて異なるメッセージを変数textに格納する
     if(score < 100) {
       text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
      } else if(score < 200) {
        text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
      } else if(score < 300) {
        text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
      } else if(score >= 300) {
        text = `あなたのランクはSです。\nおめでとうございます!`;    
      }
     
      // 生成したメッセージと一緒に文字列を返す
      return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

 // ゲームを終了    //  const gameOver = id => {};
 const gameOver = id => {
  clearInterval(id);

  const result = confirm(rankCheck(score));

   // OKボタンをクリックされたらリロードする
   if(result == true) {
    window.location.reload();
  }
};


 // カウントダウンタイマー    //  const timer = () => {};
 const timer = () => {
  // タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;

  const id = setInterval(() => {

    // カウントダウンする
    time--;
    count.textContent = time;

    // カウントが0になったらタイマーを停止する
    if(time <= 0) {
      // clearInterval(id);
      gameOver(id);
    }
  }, 1000);
};
 // 7.4 タイマーの仕組みについて理解しよう
// JavaScriptでタイマーを実装するには、setInterval()メソッドとclearInterval()メソッドを使います。
// setInterval()メソッドはタイマーを動かす機能で、clearInterval()メソッドはタイマーを止める機能です。
// setInterval()メソッド：一定時間ごとに特定の処理を繰り返す、タイマーを動かす機能
/*    const 定数 = setInterval(() => {
         処理;
      }, 処理間隔);  */
// setTimeout()メソッド：一定時間後に一度だけ特定の処理を行う、タイマーを止める機能


 // キーボードのイベント処理
// document.addEventListener('keypress', keyPress);

// 対象要素.addEventListener(イベント, イベント発生時に呼び出す関数);
/* イベント：Webページ上のボタンをクリックしたり、キーボードでキーを入力したりすること
イベントリスナー：イベントをきっかけに開始させる処理のこと
イベントオブジェクト：イベントのすべての情報（「何の要素に」「何をきっかけに」「何のキーが入力された」など）が詰まったもの
addEventListener()メソッドで、イベントとイベントリスナーを対応づける 
　　　↓書き方↓
　　　HTML要素.addEventListener('イベントの種類', () => {
　　　  イベント処理
　　　});
*/

 // ゲームスタート時の処理
 start.addEventListener('click', () => {

   // カウントダウンタイマーを開始する
   timer();
 
  // ランダムなテキストを表示する
  createText();

  // 「スタート」ボタンを非表示にする
  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';

