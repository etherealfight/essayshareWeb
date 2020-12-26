import {
    instance
} from './instance'

/**
 * @description:用户注册 
 * @param {String} username 
 * @param {String} password 
 * @param {String} nickname 
 * @return {Obj}  
 */
export const regist = (username, password, nickname) => {
    return instance({
        url: '/regist',
        method: 'GET',
        params: {
            username,
            password,
            nickname
        }
    })
}
/**
 * @description:用户登录 
 * @param {String} username 
 * @param {String} password 
 * @return {Obj}  
 */
export const login = (username, password) => {
    return instance({
        url: '/login',
        method: 'GET',
        params: {
            username,
            password
        }
    })
}
/**
 * @description:更新用户数据 
 * @param {String} username 
 * @param {String} nickname 
 * @param {Number} gender 
 * @param {String} signature 
 * @param {String} introductory
 * @return {Obj}  
 */
export const update = (username, nickname, gender, signature, introductory, fileaddress) => {
    return instance({
        url: '/update',
        method: 'GET',
        params: {
            username,
            nickname,
            gender,
            signature,
            introductory,
            fileaddress
        }
    })
}
/**
 * @description:发表文章
 * @param {String} username 
 * @param {String} production 
 * @return {Obj} 
 */
export const publish = (username, production) => {
    let form = new FormData();
    form.append(
        'username', username,
    )
    form.append(
        'production', production)
    return instance({
        url: '/updateworks',
        method: 'POST',
        data: form
    })
}
/**
 * @description:通过页数查询初始文章数据
 * @param {Number} CurrentPage 
 * @return {Obj} 
 */
export const searchData = (currentPage) => {
    return instance({
        url: '/findinit',
        method: 'GET',
        params: {
            currentPage
        }
    })
}
/**
 * @description:通过用户名精确查询该用户发表的文章
 * @param {String} username 
 * @param {Number} currentPage 
 * @return {Obj} 
 */
export const searchData1 = (username, currentPage) => {
    return instance({
        url: '/findbyusername',
        method: 'GET',
        params: {
            username,
            currentPage
        }
    })
}
/**
 * @description:通过关键字模糊查询包含该关键字的文章
 * @param {string} targetParam 
 * @param {number} currentPage 
 * @return {} 
 */
export const searchData2 = (targetParam, currentPage) => {

    return instance({
        url: '/findbysen',
        method: 'GET',
        params: {
            targetParam,
            currentPage
        }
    })
}

// export const uploadImg = (file) => {
//     let form = new FormData();
//     form.append('file', file)
//     return instance({
//         url: '/uploadfile',
//         method: 'POST',
//         data: form
//     })
// }
/**
 * 删除评论
 */
export const deleteContent = (id) => {
    return instance({
        url: '/deletesen',
        method: 'GET',
        params: {
            id
        }
    })
}