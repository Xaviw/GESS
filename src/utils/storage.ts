interface Storage {
  value: any;
  expires?: number;
  startTime?: number;
}

// localStorage
const local = {
  /**
   * 存储LocalStorage
   * @param key 名称
   * @param value 值
   * @param expires 过期时间，毫秒ms
   */
  set(key: string, value: any, expires?: number): void {
    let data: Storage = { value };
    if (expires) {
      data = { ...data, expires, startTime: Date.now() };
    }
    localStorage.setItem(key, JSON.stringify(data));
  },

  //取出
  get(key: string): any {
    let item = localStorage.getItem(key);
    if (!item) return;
    let res: Storage = JSON.parse(item);
    // 如果有startTime的值，说明设置了失效时间
    if (res?.startTime && res?.expires) {
      let date = Date.now();
      // 如果大于就是过期了，如果小于或等于就还没过期
      if (date - res.startTime > res.expires) {
        localStorage.removeItem(key);
        return;
      }
    }
    return res.value;
  },

  // 删除
  remove(key: string): void {
    localStorage.removeItem(key);
  },

  // 清除全部
  clear(): void {
    localStorage.clear();
  },
};

export { local };
