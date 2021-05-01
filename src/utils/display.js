export const displayContent = (content) => {
    var contentCopy = content;
    var mapObj = {
        $$:"$",
        $:"$\\$$"
    };
    contentCopy = contentCopy.replace(/\$\$|\$/gi, function(matched){
        return mapObj[matched];
    });
    return(contentCopy);
}
