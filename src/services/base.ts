/* eslint-disable no-async-promise-executor */
export class BaseService<T> {
  baseUrl: string = '';
  constructor(baseURL: string) {
    this.baseUrl = baseURL;
  }
  /**
   * return data from service.
   * @returns Promise type
   */
  get(): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await fetch(`${this.baseUrl}`);
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * get one entity from service
   * @param id
   * @returns Promise type
   */
  getOne(id: string | number): Promise<T> {
    console.log("🚀 ~ BaseService<T> ~ getOne ~ id:", id)
    return new Promise<T>(async (resolve, reject) => {
        try {
          const response = await fetch(`${this.baseUrl}/${id}`);
          const data = await response.json();
          console.log("🚀 ~ BaseService<T> ~ returnnewPromise<T> ~ data:", data)
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
  }

  /**
   * creates a new data from service.
   * @param data
   * @returns Promise type
   */
  create(data: T): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await fetch(this.baseUrl, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const resp = await response.json();
        resolve(resp);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * update the data from service
   * @param url
   * @param data
   * @returns promise type
   */
  update(data: T, id: string | number): Promise<T> {
    console.log("🚀 ~ BaseService<T> ~ update ~ id:", id)
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: 'patch',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const resp = await response.json();
        resolve(resp);
      } catch (error) {
        console.log("🚀 ~ BaseService<T> ~ returnnewPromise<T> ~ error:", error)
        reject(error);
      }
    });
  }
  /**
   * deletes a data from service.
   * @param id
   * @returns
   */
  remove(id: string | number) {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: 'delete',
        });
        const resp = await response.json();
        resolve(resp);
      } catch (error) {
        reject(error);
      }
    });
  }
}
