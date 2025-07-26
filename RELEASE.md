# Release Guide

## 手动发布流程

本项目使用GitHub Actions进行手动发布，支持自动版本升级和Git标签管理。

### 发布步骤

1. **访问GitHub Actions页面**
   - 进入项目的GitHub页面
   - 点击 "Actions" 标签页
   - 选择 "Publish to NPM" 工作流

2. **配置发布参数**
   - **Version type**: 选择版本升级类型
     - `patch`: 补丁版本 (0.1.1 → 0.1.2)
     - `minor`: 次要版本 (0.1.1 → 0.2.0)
     - `major`: 主要版本 (0.1.1 → 1.0.0)
   - **Dry run**: 选择是否进行试运行
     - `false`: 实际发布到NPM
     - `true`: 仅测试流程，不实际发布

3. **执行发布**
   - 点击 "Run workflow" 按钮
   - 选择目标分支 (通常是 `main`)
   - 确认参数后点击 "Run workflow"

### 发布流程说明

发布工作流会自动执行以下步骤：

1. **代码质量检查**
   - 类型检查
   - 代码规范检查
   - 测试运行

2. **版本管理**
   - 自动升级 `package.json` 中的版本号
   - 提交版本变更到Git
   - 创建并推送Git标签

3. **发布到NPM**
   - 构建项目
   - 发布到NPM注册表

4. **创建GitHub Release**
   - 自动创建GitHub Release
   - 关联对应的Git标签

### 注意事项

- 发布前确保所有测试通过
- 确保有足够的权限访问NPM注册表
- 版本号遵循语义化版本控制规范
- 发布后会自动创建GitHub Release

### 回滚

如果需要回滚发布：

1. 删除NPM包版本 (如果支持)
2. 删除GitHub Release
3. 删除Git标签
4. 回滚版本号变更

### 权限要求

发布工作流需要以下权限：

- `contents: write`: 推送代码和标签
- `id-token: write`: NPM认证
- `NPM_TOKEN`: NPM发布令牌
- `GITHUB_TOKEN`: GitHub操作权限
