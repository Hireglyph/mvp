/* for all content passed in:
replace all $$ with $ so users need to write $$ to trigger LaTeX
replace $ with $\\$$ so that a single $ doesn't trigger LaTeX */
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
