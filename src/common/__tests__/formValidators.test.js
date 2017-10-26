import { required, email, minLength, url, phone } from '../formValidators';

describe('Form validators', () => {
  describe('required', () => {
    it('should not pass with an empty string', () => {
      expect(required('')).toBeFalsy();
    });

    it('should pass if the string length is greater than or equal to 1', () => {
      expect(required('s')).toBeTruthy();
      expect(required('fdfsd sdfsdfds sdfdsfds dsfsdf')).toBeTruthy();
    });
  });

  describe('email', () => {
    it('should not pass with an invalid email', () => {
      expect(email('sdfsd')).toBeFalsy();
      expect(email('fsfdsfds@')).toBeFalsy();
      expect(email('sdfs@kfkdsmf')).toBeFalsy();
      expect(email('@kmkmd')).toBeFalsy();
      expect(email('@ksksks.com')).toBeFalsy();
      expect(email('human@readable.fffff')).toBeFalsy();
    });
    it('should pass if email is valid', () => {
      expect(email('kmksm@mskmsks.com')).toBeTruthy();
      expect(email('human@readable.org')).toBeTruthy();
      expect(email('human@readable.biz')).toBeTruthy();
      expect(email('human@readable.ffff')).toBeTruthy();
    });
  });

  describe('minLength', () => {
    it('should not pass with a length smaller than the required length', () => {
      expect(minLength(4)('123')).toBeFalsy();
      expect(minLength(12)('12345678')).toBeFalsy();
    });

    it('should pass with string if it is greater than or equal to the min required length', () => {
      expect(minLength(4)('1234')).toBeTruthy();
      expect(minLength(4)('123456789')).toBeTruthy();
      expect(minLength(12)('123456789012')).toBeTruthy();
      expect(minLength(20)('12345678901234567890123456')).toBeTruthy();
    });
  });

  describe('url', () => {
    it('should not pass if the string is an invalid url format', () => {
      expect(url('fghfghfgh')).toBeFalsy();
      expect(url('http://sdfdsfsdfd')).toBeFalsy();
      expect(url('https://sdfdsfsdfd.')).toBeFalsy();
      expect(url('www.sdfd.sfdfsd')).toBeFalsy();
    });
    it('should pass if the string is a valid url format', () => {
      expect(url('humanreadable.com')).toBeTruthy();
      expect(url('http://humanreadable.com/nested')).toBeTruthy();
      expect(url('www.humanreadable.net')).toBeTruthy();
      expect(url('https://www.fff.com/something/long')).toBeTruthy();
    });
  });

  describe('phone', () => {
    it('should not pass with an invalid phone number format', () => {
      expect(phone('dfg-gdfgd-gdfg')).toBeFalsy();
      expect(phone('(555)-555555')).toBeFalsy();
      expect(phone('55555555555555555')).toBeFalsy();
      expect(phone('555-55 ext. 584')).toBeFalsy();
    });
    it('should pass if string is a valid phone number format', () => {
      expect(phone('555-555-5555')).toBeTruthy();
      expect(phone('(232) 555 - 5555')).toBeTruthy();
      expect(phone('1 (232) 555 - 5555')).toBeTruthy();
      expect(phone('+14445555678')).toBeTruthy();
    });
  });
});
