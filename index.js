 
var oUl = $(".search-ul");
var input = $("input[type='text']");
var value = null;

input.on("input", function () {
  value = this.value; 
  var oScript = "<script src='https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + value + "&callback=doJson'>"
  $(document.body).append(oScript);
  $("script[src^='http']").remove()

});

input.on("focus", function (e) {
  // value ：null初始化状态 ""是清空字符状态 
  if (value !== null && value !== "") {
    oUl.show(); // 该处显示动态生成的列表
  }
})

$(document).on("click", function (e) {

  if (e.target.type !== "text") {
    // 搜索框失去焦点 列表隐藏
    oUl.hide(); // 隐藏动态列表

    // oUl是列表 
    // 列表含有超链接，点击列表页面跳转，
    // 但在点击列表的瞬间，input失去焦点，列表隐藏
    // 解决思路：绑定body点击事件 body被点击则隐藏列表
  }

})



function doJson(res) {
  // 数据渲染
  var s = res.query.pages 
    str = "";
  if (s != undefined) {
    for(var prop in s){ 
      if(s.hasOwnProperty(prop)){ 
        str += "<a href=https://en.wikipedia.org/?curid=" + prop + "><li>" + s[prop].title + "</li></a>";
      }
    } 
        
    oUl.html(str);
    oUl.show();
  } else {
    oUl.hide();
  }
}

$(".search").on('click', function () {

  // 思路：把输入的关键词绑定到超链接地址，利用超链接实现页面跳转
  var bHref = "https://en.wikipedia.org/?curid=" + value;
  $(this).attr("href", bHref);
})



/*
这里是freeCodeCamp代码demo里面的一部分 
$scope.search = function () {
  $scope.results = [];
  help.addClass('hide');
  search.removeClass('fullHeight');
  var title = input.val();
  var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
  var cb = '&callback=JSON_CALLBACK';
  var page = 'https://en.wikipedia.org/?curid=';

  $http.jsonp(api + title + cb)
    .success(function (data) {
      var results = data.query.pages;
      angular.forEach(results, function (v, k) {
        $scope.results.push({ title: v.title, body: v.extract, page: page + v.pageid })
      })
    });
}
});
*/
