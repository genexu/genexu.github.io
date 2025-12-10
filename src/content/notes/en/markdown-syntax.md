---
title: "Markdown Syntax"
description: "Record Markdown syntax, display and test Markdown Plugin effects"
pubDate: "Oct 3 2023"
tags: ["Markdown"]
---

# H1
## H2
### H3
#### H4
##### H5

---
*Italic*
**Bold**
***Bold & Italic***
~~Strikethrough~~

---
>Blockquote

>First level
>>Second level
>>>Third level

---
1. Numbered list
2. Numbered list
3. Numbered list
- Bullet list
- Bullet list
+ Bullet list
+ Bullet list
* Bullet list
* Bullet list

---
- Unordered list
- Unordered list
    - Sub-list
        - Sub-sub-list

1. Ordered list
2. Ordered list
    1. Sub-list
        1. Sub-sub-list

---
[Link name](https://google.com "Hover text")

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

  [1]: http://google.com/        "Hover text"
  [2]: http://search.yahoo.com/  "Hover text"
  [3]: http://search.msn.com/    "Hover text"

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
