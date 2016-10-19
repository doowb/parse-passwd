'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var parse = require('../');

var fixture = path.join(__dirname, 'fixtures', 'passwd');

describe('parse-passwd', function() {
  it('should export a function', function() {
    assert.equal(typeof parse, 'function');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      parse();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected a string');
      cb();
    }
  });

  it('should parse a passwd file', function() {
    var expected = [
      {username: 'nobody', password: '*', uid: '-2', gid: '-2', gecos: 'Unprivileged User', homedir: '/var/empty', shell: '/usr/bin/false'},
      {username: 'root', password: '*', uid: '0', gid: '0', gecos: 'System Administrator', homedir: '/var/root', shell: '/bin/sh'},
      {username: 'daemon', password: '*', uid: '1', gid: '1', gecos: 'System Services', homedir: '/var/root', shell: '/usr/bin/false'},
      {username: 'doowb', password: '*', uid: '123', gid: '123', gecos: 'Brian Woodward', homedir: '/Users/doowb', shell: '/bin/bash'}
    ];
    var actual = parse(fs.readFileSync(fixture, 'utf8'));
    assert.deepEqual(actual, expected);
  });
});
