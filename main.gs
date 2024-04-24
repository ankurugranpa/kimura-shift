function createGoogleForm() {

  // 日付と曜日の配列を作成
  var dates = [];
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth();
  var startDate = new Date(year, month, 16);
  var endDate = new Date(year, month + 1, 15);
  var month_show = month + 1;
  // 新しいフォームを作成
  var form = FormApp.create(year + '年' + month_show + `月のシフト希望調査`);
  
  

  while (startDate <= endDate) {
    var dateString = startDate.getDate() + '日(' + getDayOfWeek(startDate.getDay()) + ')';
    dates.push(dateString);
    startDate.setDate(startDate.getDate() + 1);
  }

   // 名前の入力欄を追加
  var nameItem = form.addTextItem();
  nameItem.setTitle('名前');
  nameItem.setRequired(true); // 必須項目に設定

  // 具体的な日の調査
  const item = form.addGridItem();
  var explanation = "可能な日をO 無理な日をX を選択してください"
  item.setTitle(explanation);

  // グリッドの行と列を設定
  item.setRows(dates)
      .setColumns(['O:17時から可能', 'O: 18時からのみ', 'X'])
      .setRequired(true);


  // 意識調査
  const ask_motivation = form.addMultipleChoiceItem();
  ask_motivation.setTitle('キムラのバイトで月どのくらい入りたいですか?\n(カッコ内はその回数で稼げる金額幅です)')
  ask_motivation.setChoiceValues(['希望なし', '5回未満(0〜14760円)', '5回以上10回未満(13950〜33210円)','10回以上15回未満(27900~51660円)','15回以上(41850~114390円)'])
  ask_motivation.setRequired(true)

  // 偏りの希望
  const ask_bias = form.addMultipleChoiceItem();
  ask_bias.setTitle('月単位で見た際、毎週のシフトの量は同じぐらいがいいですか?(ex: だいたい週2でシフト,週4の週とかはないなど)');
  ask_bias.setChoiceValues(['同じぐらいがいい', '偏りがあっても大丈夫'])
  ask_bias.setRequired(true)

 // 希望度合い調査
  const ask_degree = form.addGridItem();
  ask_degree.setTitle('先ほど聞いたシフトノ希望回数に関しての質問です。当てはまるものを選択してください')
  ask_degree.setRows(['希望より回数が増える', '希望より回数が減る'])
      .setColumns(['O 大丈夫', 'X 無理', '△ 少しなら可能'])
      .setRequired(true)
  
  // 連勤に対する調査
  const ask_continuous = form.addCheckboxItem();
  ask_continuous.setTitle('連続勤務についてどう思いますか?')
  ask_continuous.setChoiceValues(['2連勤までなら可', '3連勤までなら可', '4連勤までなら可', 'できるだけ連勤がいい', '連勤NG'])
  ask_continuous.setRequired(true)
  // フォームのリンクをログに出力
  Logger.log('フォームを作成しました: ' + form.getPublishedUrl());
  Logger.log('フォームの編集リンク: ' + form.getEditUrl());
}

// 曜日を取得するヘルパー関数
function getDayOfWeek(day) {
  var weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  return weekdays[day];
}
