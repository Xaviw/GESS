interface Storage {
  value: any;
  expires?: string | number;
  startTime?: string | number;
}

// localStorage
const local = {
  //存储,可设置过期时间
  set(key: string, value: any, expires?: number): void {
    if (expires) {
      let data: Storage = { value, expires, startTime: Date.now() };
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      if (typeof value === "object") {
        value = JSON.stringify(value);
      }
      localStorage.setItem(key, value);
    }
  },
  //取出
  get(key: string): string | object | undefined {
    let item = localStorage.getItem(key);
    if (!item) return;
    let res: Storage = JSON.parse(item);
    // 如果有startTime的值，说明设置了失效时间
    if (res?.startTime && res?.expires) {
      let date = Date.now();
      // 如果大于就是过期了，如果小于或等于就还没过期
      if (date - Number(res.startTime) > res.expires) {
        localStorage.removeItem(key);
        return;
      }
    }
    return res;
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
