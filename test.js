var test = require('tape');
var hash = require('./').hashlittle;

function ascii2ab(s) {
  var u8 = new Uint8Array(s.length);
  for (var i = 0, l = s.length; i < l; ++i) {
    u8[i] = s.charCodeAt(i);
  }
  return u8;
}

test('empty hash', function(t) {
  var v = hash(new Uint8Array(0), 0);
  t.equal(v, 0xdeadbeef);
  t.end();
});

test('empty hash 2', function(t) {
  var v = hash(new Uint8Array(0), 0xdeadbeef);
  t.equal(v, 0xbd5b7dde);
  t.end();
});

test('hash', function(t) {
  var u8 = ascii2ab('Four score and seven years ago')
  var v = hash(u8, 0);
  t.equal(v, 0x17770551);
  t.end();
});

test('hash 2', function(t) {
  var u8 = ascii2ab('Four score and seven years ago')
  var v = hash(u8, 1);
  t.equal(v, 0xcd628161);
  t.end();
});

test('hash 3', function(t) {
  t.equal(hash(ascii2ab('1'), 0x00000000), 0x9a92a17c);
  t.equal(hash(ascii2ab('12'), 0x00000000), 0x296f282a);
  t.equal(hash(ascii2ab('123'), 0x00000000), 0x19fe11d3);
  t.equal(hash(ascii2ab('1234'), 0x00000000), 0xffe6567b);
  t.equal(hash(ascii2ab('12345'), 0x00000000), 0x2b742316);
  t.equal(hash(ascii2ab('123456'), 0x00000000), 0x42d5ce3d);
  t.equal(hash(ascii2ab('1234567'), 0x00000000), 0x934d5232);
  t.equal(hash(ascii2ab('12345678'), 0x00000000), 0x941b63d3);
  t.equal(hash(ascii2ab('123456789'), 0x00000000), 0x845d9a96);
  t.equal(hash(ascii2ab('1234567890'), 0x00000000), 0xd54e6833);
  t.equal(hash(ascii2ab('1234567890a'), 0x00000000), 0x9eb47e83);
  t.equal(hash(ascii2ab('1234567890ab'), 0x00000000), 0x5bccb59b);
  t.equal(hash(ascii2ab('1234567890abc'), 0x00000000), 0x35df4abe);
  t.equal(hash(ascii2ab('1234567890abcd'), 0x00000000), 0xdb21959c);
  t.equal(hash(ascii2ab('1234567890abcde'), 0x00000000), 0x7facea3d);
  t.equal(hash(ascii2ab('1234567890abcdef'), 0x00000000), 0x9a1f7880);
  t.equal(hash(ascii2ab('1234567890abcdefg'), 0x00000000), 0x38ba8e54);
  t.equal(hash(ascii2ab('1234567890abcdefgh'), 0x00000000), 0x44d9b4d5);
  t.equal(hash(ascii2ab('1234567890abcdefghi'), 0x00000000), 0xa7051d32);
  t.equal(hash(ascii2ab('1234567890abcdefghij'), 0x00000000), 0x5d5d297c);
  t.equal(hash(ascii2ab('1234567890abcdefghijk'), 0x00000000), 0x8c1a37fd);
  t.equal(hash(ascii2ab('1234567890abcdefghijkl'), 0x00000000), 0x50985d4f);
  t.equal(hash(ascii2ab('1234567890abcdefghijklm'), 0x00000000), 0xc39be695);
  t.equal(hash(ascii2ab('1234567890abcdefghijklmn'), 0x00000000), 0x57287698);
  t.equal(hash(ascii2ab('1234567890abcdefghijklmno'), 0x00000000), 0x7f2b13b9);
  t.equal(hash(ascii2ab('1234567890abcdefghijklmnop'), 0x00000000), 0xe4187b3c);
  t.equal(hash(ascii2ab('1234567890abcdefghijklmnopq'), 0x00000000), 0xf36ac6bb);
  t.equal(hash(ascii2ab('1234567890abcdefghijklmnopqs'), 0x00000000), 0xb4730e47);
  t.equal(hash(ascii2ab('1234567890abcdefghijklmnopqst'), 0x00000000), 0x36033d0c);
  t.equal(hash(ascii2ab('1234567890abcdefghijklmnopqstu'), 0x00000000), 0x1d92654e);
  t.equal(hash(ascii2ab('1234567890abcdefghijklmnopqstuv'), 0x00000000), 0x37dbb3e5);
  t.equal(hash(ascii2ab('1234567890abcdefghijklmnopqstuvw'), 0x00000000), 0xe5ff9295);
  t.equal(hash(ascii2ab('1234567890abcdefghijklmnopqstuvwx'), 0x00000000), 0x8ad73d1e);
  t.equal(hash(ascii2ab('1234567890abcdefghijklmnopqstuvwxy'), 0x00000000), 0xcb4c6b25);
  t.equal(hash(ascii2ab('1234567890abcdefghijklmnopqstuvwxyz'), 0x00000000), 0x4f9f95c1);
  t.end();
});

test('hash 1 2 3', function(t) {
  var v = hash(new Uint8Array([1, 2, 3]), 0xdeadbeef);
  t.equal(v, 0x271b32ed);
  t.end();
});
