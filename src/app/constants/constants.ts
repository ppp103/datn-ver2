export class Constant{
    public static PageSetting = {
        PageNumber: 1, PageSize: 10
    }

    public static PracticeTestType = {
        UserId : 0,
        TestId : 1
    }
}

export interface Upload {
    progress: number
    state: 'PENDING' | 'IN_PROGRESS' | 'DONE'
  }