let url = "";

if (process.env.NODE_ENV === "development") {
    url = 'http://localhost:4000'
} else {
    url = 'http://www.cumquats.cn:4000'
}

export const baseUrl = url;

export const setFormData = (obj) => {
    const formData = new FormData();
    if (obj && obj instanceof Object) {
        const keys = Object.keys(obj);
        if (keys && keys.length) {
            keys.forEach(key => {
                formData.append(key, obj[key]);
            });
        }
    }
    return formData;
};

export const setUrlEncoded = (obj) => {
    let urlEncoded = '';
    if(obj && obj instanceof Object) {
        const keys = Object.keys(obj);
        if(keys && keys.length) {
            keys.forEach((key, index) => {
                urlEncoded += `${key}=${obj[key]}`;
                if(index + 1 < keys.length){
                    urlEncoded += '&';
                }
            });
        }
    }
    return urlEncoded;
}
