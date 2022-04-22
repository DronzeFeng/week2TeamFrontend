const postsList = document.querySelector('#postsList');  // 貼文列表
const keywordInput = document.querySelector('#keywordInput'); // 關鍵字搜尋
const btnSearch = document.querySelector('#btnSearch'); // 搜尋按鈕
let postData = [];  //貼文資料

// 初始化
function init() {
    getPostsList();
}
init();

// 取得貼文列表
function getPostsList() {
    axios
        .get(
            `${baseUrl}`
        )
        .then( response => {
            postData = response.data;
            renderPostsList(postData);
        })
}

//預設-無貼文資料的HTML格式
function noPostDataHTML(info) {
    return `<div class="card border-2 border-blod shadow-black">
        <div class="card-header bg-white">
        <div class="d-flex">
            <div class="p-1 bg-danger border border-light rounded-circle me-1"></div>
            <div class="p-1 bg-success border border-light rounded-circle me-1"></div>
            <div class="p-1 rounded-circle border border-light rounded-circle bg-warning"></div>
        </div>
        </div>
        <div class="card-body py-5">
        <p class="card-text text-muted text-center">
            ${info}
        </p>
        </div>
    </div>`;
}

//將取得的貼文組成HTML格式
function combinePostHTMLItem(item) {
    console.log(item);
    let userImage = "./dist/img/default_user.png";  // 使用者預設圖示
    let userImageInfo = "default-user";  //使用者圖片預設資訊
    let contentImage = ""; //內容圖片，預設為空
    if(item.userImage.startsWith('https') == true){
        userImage = item.userImage;
        userImageInfo = 'user-upload-image';
    }
    if(item.contentImage.startsWith('https') == true){
        contentImage = item.contentImage;
    }
    return `<li class="card h-100 py-4 px-4 mb-3 border-blod shadow-black">
        <div class="d-flex align-items-center mb-3">
        <img class="me-3 img-fluid user-image" src="${userImage}" alt="${userImageInfo}" />
        <div class="d-flex flex-column mt-2">
            <a href="#" class="mb-0 fw-bold">${item.userName}</a>
            <small class="text-muted">${item.createdAt}</small>
        </div>
        </div>
        <p>${item.contentMessage}</p>
        <img src="${contentImage}" alt="" class="img-fluid" />
    </li>`;
}

// 重新整理貼文列表
function renderPostsList(data) {
	let str = '';
    if (data.length === 0 || data.length === undefined){ //沒有貼文資料
        str += noPostDataHTML('目前尚無動態，新增一則貼文吧！');
    }else{
        data.forEach( item => {
            str += combinePostHTMLItem(item);
        });
    }
    postsList.innerHTML = str;
}

// 關鍵字搜尋
btnSearch.addEventListener("click", (e) => {
    let queryKeyword = keywordInput.value.trim();
    let queryData = [];
    if (queryKeyword !== '') {
        let str = '';
        postData.forEach((item) => {
            if (item.userContent.indexOf(queryKeyword) >= 0) {
                str += combinePostHTMLItem(item);
            }
        });
        if (str !== '') {
            postsList.innerHTML = str;
        }else{
            postsList.innerHTML = noPostDataHTML('搜尋不到您欲查詢的貼文！');
        }
    }else{
        queryData = postData;
        renderPostsList(queryData);
    }
   
    // 清空搜尋結果
    keywordInput.value = '';
});

goAddPostPage = () => {  //轉址至 addPost.html
    location.href = 'addPost.html';
}