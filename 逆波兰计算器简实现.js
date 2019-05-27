const stack = []
const str = '(1*9)+(2-3)*4+5/5'
// 1 2 3 - 4 * + 5 5 / +
const out = []

function peek () {
    return stack[stack.length - 1]
}

for (let i = 0; i < str.length; i++) {
    const s = str[i]
    if (/\d/.test(s)) {
        out.push(s)
    } else if (s == '*' || s == '/' || s == '(') {
        stack.push(s)
    } else if (s == '+' || s == '-') {
        if (stack.length == 0) {
            stack.push(s)
        } else {
            if (peek() == '(') {
                stack.push(s)
            } else {
                while (stack.length > 0) {
                    out.push(stack.pop())
                }
                stack.push(s)
            }
        }
    } else if (s == ')') {
        let top = stack.pop()
        while (top != '(') {
            out.push(top)
            top = stack.pop()
        }
    }
    console.log(stack, out)
}
console.log('1+(2-3)*4+5/5')

let r = out.concat(stack.reverse())

console.log(r.join(' '))

console.log('1 2 3 - 4 * + 5 5 / +')

let i = 0
let st = []
while (i < r.length) {
    let e = r[i]
    if (/\d/.test(e)) {
        st.push(e)
    } else if (e == '+') {
        let last = parseInt(st.pop())
        let first = parseInt(st.pop())
        st.push(first + last)
    } else if (e == '-') {
        let last = parseInt(st.pop())
        let first = parseInt(st.pop())
        st.push(first - last)
    } else if (e == '*') {
        let last = parseInt(st.pop())
        let first = parseInt(st.pop())
        st.push(first * last)
    } else if (e == '/') {
        let last = parseInt(st.pop())
        let first = parseInt(st.pop())
        st.push(first / last)
    }
    i++
}
console.log(st)
