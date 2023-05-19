export default function joinTagTmpl(args) {
    let strs = args[0], str = strs[0];
    for(let i=1, len = args.length; i < len; i++) {
        str += args[i] + strs[i+1];
    }
    return str;
}