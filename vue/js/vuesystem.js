$(function () {
    // nav收缩展开
    $('.nav-item>a').on('click', function () {
        if (!$('.nav').hasClass('nav-mini')) {
            if ($(this).next().css('display') == "none") {
                //展开未展开
                $('.nav-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(300);
                $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');
            } else {
                //收缩已展开
                $(this).next('ul').slideUp(300);
                $('.nav-item.nav-show').removeClass('nav-show');
            }
        }
    });
});
var app = new Vue({
    el: '#table',
    data: {
        addDetail: {},
        editlist: false,
        editDetail: {},
        newsList: [{
            title: '在移动设备开发',
            user: '张若昀',
            dates: '2018-02-09',
            id: "1"
        }, {
            title: '图形及特效特性',
            user: '张若昀',
            dates: '2018-02-09',
            id: "2"
        }, {
            title: '设备兼容特性',
            user: '张若昀',
            dates: '2018-02-09',
            id: "3"
        }, {
            title: 'W3C将致力于开发用于实时通信',
            user: '张若昀',
            dates: '2018-02-09',
            id: "4"
        }, {
            title: '全新的表单输入对象',
            user: '张若昀',
            dates: '2018-02-09',
            id: "5"
        }],
        editid:'',
        searchVal:'',    //默认输入为空
        letter:'',       //默认不排序
        original:false   //默认从小到大排列
    },
    mounted() {

    },
    methods: {

        //新增
        adddetail() {
            //这里的思路应该是把this.addDetail传给服务端，然后加载列表this.newsList
            //this.newsList.push(this.addDetail)
            this.newsList.push({
                title: this.addDetail.title,
                user: this.addDetail.user,
                dates: this.addDetail.dates,
                id:Math.floor(Math.random()*1000000+1)
            })

            //axios.post('url',this.addDetail).then((res) =>{
            //若返回正确结果，清空新增输入框的数据
            //this.addDetail.title = ""
            //this.addDetail.user = ""
            //this.addDetail.dates = ""
            //})

        },
        //删除
        deletelist(id, i) {
            this.newsList.splice(i, 1);
            //这边可以传id给服务端进行删除  ID = id
            //axios.get('url',{ID:id}).then((res) =>{
            //			加载列表
            //})
        },
        //编辑
        edit(item) {
            console.log(item)
            this.editDetail = {
                title: item.title,
                user: item.user,
                dates: item.dates,
                id: item.id
            }
            this.editlist = true
            this.editid = item.id

        },
        //确认更新
        update() {
            //编辑的话，也是传id去服务端
            //axios.get('url',{ID:id}).then((res) =>{
            //			加载列表
            //})
            let _this= this
            for(let i = 0; i < _this.newsList.length; i++) {
                if(_this.newsList[i].id ==this.editid) {
                    _this.newsList[i] = {
                        title: _this.editDetail.title,
                        user: _this.editDetail.user,
                        dates: _this.editDetail.dates,
                        id: this.editid
                    }
                    this.editlist = false
                }
            }
        },
        orderFn(letter,original){
            this.letter = letter;       //排序字段 price or sales
            this.original = original;   //排序方式  up or down
        }
    },
    computed:{
        list: function(){
            var _this = this;
            //逻辑-->根据input的value值筛选goodsList中的数据
            var arrByZM = [];//声明一个空数组来存放数据
            for (var i=0;i<this.newsList.length;i++){
                //for循环数据中的每一项（根据name值）
                if((this.newsList[i].id.search(this.searchVal) != -1)){
                    //判断输入框中的值是否可以匹配到数据，如果匹配成功
                    arrByZM.push(this.newsList[i]);
                    //向空数组中添加数据
                }
            }
            //逻辑-->升序降序排列  false: 默认从小到大  true：默认从大到小
            //判断，如果要letter不为空，说明要进行排序
            if(this.letter != ''){
                arrByZM.sort(function( a , b){
                    if(_this.original){
                        return b[_this.letter] - a[_this.letter];
                    }else{
                        return a[_this.letter] - b[_this.letter];
                    }
                });
            }
            //一定要记得返回筛选后的数据
            return arrByZM;
        }
    }
})
