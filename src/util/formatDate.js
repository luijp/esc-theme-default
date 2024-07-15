export default function formatDate(dateStr,type=1) {
    const date = new Date(dateStr)
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');

    if(type === 1){
        return `${year}-${month}-${day}`;
    }
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}