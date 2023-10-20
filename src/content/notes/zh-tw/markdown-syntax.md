---
layout: "../../../layouts/PostLayout.astro"
title: "Markdown Syntax"
description: "紀錄 Markdown 語法，呈現與測試 Markdown Plugin 效果"
pubDate: "Oct 3 2023"
tags: ["Markdown"]
---

# H1
## H2
### H3
#### H4
##### H5

---
*斜體字*
**粗體字**
***斜體兼粗體***
~~刪除線~~

---
>縮排語法

>第一層
>>第二層
>>>第三層

---
1. 數字標號
2. 數字標號
3. 數字標號
- 其他標號
- 其他標號
+ 其他標號
+ 其他標號
* 其他標號
* 其他標號

---
- 無序清單
- 無序清單
    - 無序清單子清單
        - 無序清單子子清單

1. 有序清單
2. 有序清單
    1. 有序清單子清單
        1. 有序清單子子清單

---
[連結名稱](https://google.com "游標顯示")

<https://google.com>

---
```c
#include <stdio.h>

int main(){

    printf("Hello World");

    return 0;
}
```

---
[Google][1]
[Yahoo][2]
[MSN][3]

  [1]: http://google.com/        "游標顯示"
  [2]: http://search.yahoo.com/  "游標顯示"
  [3]: http://search.msn.com/    "游標顯示"

---
\+ \- \* \. \! \# \$ \% \^ \& \* \( \) \{ \} \[ \] \: \; \' \" \? \, \. \/


## GFM

### Autolink literals

www.example.com, https://example.com, and contact@example.com.

### Footnote

A note[^1]

[^1]: Big note.

### Strikethrough

~one~ or ~~two~~ tildes.

### Tasklist

* [x] done
* [ ] undone
* [ ] undone
* [ ] undone
* [ ] undone
* [ ] undone
