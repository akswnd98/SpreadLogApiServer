export default class RandomSerialGenerator {
  protected chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  protected serialLength = 32;

  generate () {
    let ret = '';
    for (let i = 0; i < this.serialLength; i++) {
      ret += this.chars[Math.floor(Math.random() * this.chars.length)];
    }
    return ret;
  }
}
