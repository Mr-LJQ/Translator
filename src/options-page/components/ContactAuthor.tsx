import React, { useMemo, useCallback } from "react";

import { H3 } from "../pure-components";

export const ContactAuthor = React.memo(function BasisConfig() {
  return (
    <>
      <H3 className="col-span-4">联系作者</H3>
      <div className="pl-1 mb-2">
        <h4 className="text-2xl text-gray-700">BUG报告|功能请求</h4>
        <p className="pt-3 pl-3 text-xl">
          <a
            target="__black"
            className="text-[#3469ce]"
            href="https://gitee.com/LiLearn/translator-browser-extensions/issues"
          >
            代码仓库 Issues
          </a>
        </p>
      </div>
      <div className="pl-1">
        <h4 className="text-2xl text-gray-700">作者邮箱</h4>
        <p className="pt-3 pl-3 text-xl">
          <a className="text-[#3469ce]" href="mailto:1029520042@qq.com">
            1029520042@qq.com
          </a>
        </p>
      </div>
    </>
  );
});
