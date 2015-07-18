/*
JavaScript port of lookup3.c hash function by Bob Jenkins
2015, port by Sergii Iefremov

http://www.burtleburtle.net/bob/c/lookup3.c

Original description below:
-------------------------------------------------------------------------------
lookup3.c, by Bob Jenkins, May 2006, Public Domain.

These are functions for producing 32-bit hashes for hash table lookup.
hashword(), hashlittle(), hashlittle2(), hashbig(), mix(), and final() 
are externally useful functions.  Routines to test the hash are included 
if SELF_TEST is defined.  You can use this free for any purpose.  It's in
the public domain.  It has no warranty.

You probably want to use hashlittle().  hashlittle() and hashbig()
hash byte arrays.  hashlittle() is is faster than hashbig() on
little-endian machines.  Intel and AMD are little-endian machines.
On second thought, you probably want hashlittle2(), which is identical to
hashlittle() except it returns two 32-bit hashes for the price of one.  
You could implement hashbig2() if you wanted but I haven't bothered here.

If you want to find a hash of, say, exactly 7 integers, do
  a = i1;  b = i2;  c = i3;
  mix(a,b,c);
  a += i4; b += i5; c += i6;
  mix(a,b,c);
  a += i7;
  final(a,b,c);
then use c as the hash value.  If you have a variable length array of
4-byte integers to hash, use hashword().  If you have a byte array (like
a character string), use hashlittle().  If you have several byte arrays, or
a mix of things, see the comments above hashlittle().  

Why is this so big?  I read 12 bytes at a time into 3 4-byte integers, 
then mix those integers.  This is fast (you can do a lot more thorough
mixing with 12*3 instructions on 3 integers than you can with 3 instructions
on 1 byte), but shoehorning those bytes into integers efficiently is messy.
-------------------------------------------------------------------------------
*/

'use strict';

var a = 0;
var b = 0;
var c = 0;

function rot(x, k) {
  return ((x << k) | (x >>> (32 - k))) >>> 0;
}

function mix() {
  a = (a - c) >>> 0;  a ^= rot(c, 4);  c = (c + b) >>> 0;
  b = (b - a) >>> 0;  b ^= rot(a, 6);  a = (a + c) >>> 0;
  c = (c - b) >>> 0;  c ^= rot(b, 8);  b = (b + a) >>> 0;
  a = (a - c) >>> 0;  a ^= rot(c, 16); c = (c + b) >>> 0;
  b = (b - a) >>> 0;  b ^= rot(a, 19); a = (a + c) >>> 0;
  c = (c - b) >>> 0;  c ^= rot(b, 4);  b = (b + a) >>> 0;
}

function final() {
  c ^= b; c = (c - rot(b, 14)) >>> 0;
  a ^= c; a = (a - rot(c, 11)) >>> 0;
  b ^= a; b = (b - rot(a, 25)) >>> 0;
  c ^= b; c = (c - rot(b, 16)) >>> 0;
  a ^= c; a = (a - rot(c, 4)) >>> 0;
  b ^= a; b = (b - rot(a, 14)) >>> 0;
  c ^= b; c = (c - rot(b, 24)) >>> 0;
}

function hashlittle(u8, initval) {
  var length = u8.length;
  a = b = c = (0xdeadbeef + length + initval >>> 0) >>> 0;

  var offset = 0;
  while (length > 12) {
    a = (a + u8[offset + 0] + (u8[offset + 1] << 8) + (u8[offset + 2] << 16) + (u8[offset + 3]  << 24)) >>> 0;
    b = (b + u8[offset + 4] + (u8[offset + 5] << 8) + (u8[offset + 6] << 16) + (u8[offset + 7]  << 24)) >>> 0;
    c = (c + u8[offset + 8] + (u8[offset + 9] << 8) + (u8[offset + 10] << 16) + (u8[offset + 11] << 24)) >>> 0;
    mix();
    length -= 12;
    offset += 12;
  }

  switch (length) {
  case 12:
    c = (c + u8[offset + 8] + (u8[offset + 9] << 8) + (u8[offset + 10] << 16) + (u8[offset + 11] << 24)) >>> 0;
    b = (b + u8[offset + 4] + (u8[offset + 5] << 8) + (u8[offset + 6] << 16) + (u8[offset + 7] << 24)) >>> 0;
    a = (a + u8[offset + 0] + (u8[offset + 1] << 8) + (u8[offset + 2] << 16) + (u8[offset + 3] << 24)) >>> 0;
    break;
  case 11:
    c = (c + u8[offset + 8] + (u8[offset + 9] << 8) + (u8[offset + 10] << 16)) >>> 0;
    b = (b + u8[offset + 4] + (u8[offset + 5] << 8) + (u8[offset + 6] << 16) + (u8[offset + 7] << 24)) >>> 0;
    a = (a + u8[offset + 0] + (u8[offset + 1] << 8) + (u8[offset + 2] << 16) + (u8[offset + 3] << 24)) >>> 0;
    break;
  case 10:
    c = (c + u8[offset + 8] + (u8[offset + 9] << 8)) >>> 0;
    b = (b + u8[offset + 4] + (u8[offset + 5] << 8) + (u8[offset + 6] << 16) + (u8[offset + 7] << 24)) >>> 0;
    a = (a + u8[offset + 0] + (u8[offset + 1] << 8) + (u8[offset + 2] << 16) + (u8[offset + 3] << 24)) >>> 0;
    break;
  case 9:
    c = (c + u8[offset + 8]) >>> 0;
    b = (b + u8[offset + 4] + (u8[offset + 5] << 8) + (u8[offset + 6] << 16) + (u8[offset + 7] << 24)) >>> 0;
    a = (a + u8[offset + 0] + (u8[offset + 1] << 8) + (u8[offset + 2] << 16) + (u8[offset + 3] << 24)) >>> 0;
    break;
  case 8:
    b = (b + u8[offset + 4] + (u8[offset + 5] << 8) + (u8[offset + 6] << 16) + (u8[offset + 7] << 24)) >>> 0;
    a = (a + u8[offset + 0] + (u8[offset + 1] << 8) + (u8[offset + 2] << 16) + (u8[offset + 3] << 24)) >>> 0;
    break;
  case 7:
    b = (b + u8[offset + 4] + (u8[offset + 5] << 8) + (u8[offset + 6] << 16)) >>> 0;
    a = (a + u8[offset + 0] + (u8[offset + 1] << 8) + (u8[offset + 2] << 16) + (u8[offset + 3] << 24)) >>> 0;
    break;
  case 6:
    b = (b + u8[offset + 4] + (u8[offset + 5] << 8)) >>> 0;
    a = (a + u8[offset + 0] + (u8[offset + 1] << 8) + (u8[offset + 2] << 16) + (u8[offset + 3] << 24)) >>> 0;
    break;
  case 5:
    b = (b + u8[offset + 4]) >>> 0;
    a = (a + u8[offset + 0] + (u8[offset + 1] << 8) + (u8[offset + 2] << 16) + (u8[offset + 3] << 24)) >>> 0;
    break;
  case 4:
    a = (a + u8[offset + 0] + (u8[offset + 1] << 8) + (u8[offset + 2] << 16) + (u8[offset + 3] << 24)) >>> 0;
    break;
  case 3:
    a = (a + u8[offset + 0] + (u8[offset + 1] << 8) + (u8[offset + 2] << 16)) >>> 0;
    break;
  case 2:
    a = (a + u8[offset + 0] + (u8[offset + 1] << 8)) >>> 0;
    break;
  case 1:
    a = (a + u8[offset + 0]) >>> 0;
    break;
  case 0:
    return c >>> 0;
  }

  final();
  return c >>> 0;
}

exports.hashlittle = hashlittle;
