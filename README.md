## SYNOPSIS

JavaScript port of lookup3.c hash function by Bob Jenkins
http://www.burtleburtle.net/bob/c/lookup3.c

## USAGE

```js
var hash = require('./').hashlittle;
hash(new Uint8Array([1, 2, 3]), 0xdeadbeef); // 0x271b32ed
```

### hashlittle(buf, initval = 0)

`buf` - buffer to hash
`initval` - any 32bit integer number
`return` - 32bit hash
