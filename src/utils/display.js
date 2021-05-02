export const displayContent = (content) => {
    let contentCopy = content;
    const mapObj = {
        $$:"$",
        $:"$\\$$"
    };
    contentCopy = contentCopy.replace(/\$\$|\$/gi, function(matched){
        return mapObj[matched];
    });
    return contentCopy;
}
