import{_ as t,o as e,c as n,V as l}from"./chunks/framework.40f7bea3.js";const C=JSON.parse('{"title":"部署","description":"","frontmatter":{},"headers":[],"relativePath":"zh_CN/guide/deployment.md","filePath":"zh_CN/guide/deployment.md"}'),s={name:"zh_CN/guide/deployment.md"},a=l(`<h1 id="部署" tabindex="-1">部署 <a class="header-anchor" href="#部署" aria-label="Permalink to &quot;部署&quot;">​</a></h1><h2 id="docker-容器部署" tabindex="-1">Docker 容器部署 <a class="header-anchor" href="#docker-容器部署" aria-label="Permalink to &quot;Docker 容器部署&quot;">​</a></h2><p>Docker 容器部署是部署 QD 的最简单方式。</p><blockquote><p>操作前请一定要记得备份数据库!!!</p></blockquote><h3 id="容器" tabindex="-1">容器 <a class="header-anchor" href="#容器" aria-label="Permalink to &quot;容器&quot;">​</a></h3><p><strong>DockerHub 网址</strong>：<a href="https://hub.docker.com/r/a76yyyy/qiandao" target="_blank" rel="noreferrer">https://hub.docker.com/r/a76yyyy/qiandao</a></p><h3 id="部署方法" tabindex="-1">部署方法 <a class="header-anchor" href="#部署方法" aria-label="Permalink to &quot;部署方法&quot;">​</a></h3><h4 id="_1-docker-compose-推荐" tabindex="-1">1. Docker Compose（推荐） <a class="header-anchor" href="#_1-docker-compose-推荐" aria-label="Permalink to &quot;1. Docker Compose（推荐）&quot;">​</a></h4><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 创建并切换到 QD 目录。</span></span>
<span class="line"><span style="color:#FFCB6B;">mkdir</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#82AAFF;">pwd</span><span style="color:#89DDFF;">)</span><span style="color:#C3E88D;">/qd/config</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#82AAFF;">pwd</span><span style="color:#89DDFF;">)</span><span style="color:#C3E88D;">/qd</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 下载 docker-compose.yml</span></span>
<span class="line"><span style="color:#FFCB6B;">wget</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://fastly.jsdelivr.net/gh/qd-today/qd@master/docker-compose.yml</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 根据需求和配置说明修改配置环境变量</span></span>
<span class="line"><span style="color:#FFCB6B;">vi</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./docker-compose.yml</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 执行 Docker Compose 命令</span></span>
<span class="line"><span style="color:#FFCB6B;">docker-compose</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">up</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span></span></code></pre></div><blockquote><p>配置描述见下文 <a href="#配置环境变量">Configuration</a></p><p>如不需要<code>OCR功能</code>或者<code>硬盘空间不大于600M</code>, 请使用 <strong><code>a76yyyy/qiandao:lite-latest</code></strong> 镜像, <strong>该镜像仅去除了OCR相关功能, 其他与主线版本保持一致</strong>。</p><p><strong>请勿使用 阿里云镜像源 拉取 Docker 容器, 会导致无法拉取最新镜像</strong></p></blockquote><h4 id="_2-docker-运行" tabindex="-1">2. Docker 运行 <a class="header-anchor" href="#_2-docker-运行" aria-label="Permalink to &quot;2. Docker 运行&quot;">​</a></h4><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">qd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">8923</span><span style="color:#C3E88D;">:80</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#82AAFF;">pwd</span><span style="color:#89DDFF;">)</span><span style="color:#C3E88D;">/qd/config:/usr/src/app/config</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">a76yyyy/qiandao</span></span></code></pre></div><p>容器内部无法连通外部网络时尝试该命令:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 使用 Host 网络模式创建容器, 端口号: 8923</span></span>
<span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">qd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--env</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PORT=</span><span style="color:#F78C6C;">8923</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--net=host</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$(</span><span style="color:#82AAFF;">pwd</span><span style="color:#89DDFF;">)</span><span style="color:#C3E88D;">/qd/config:/usr/src/app/config</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">a76yyyy/qiandao</span></span></code></pre></div><blockquote><p>注意: 使用该命令创建容器后, 请将模板里 <code>http://localhost/</code> 形式的 api 请求, 手动改成 <code>api://</code> 或 <code>http://localhost:8923/</code> 后, 才能正常完成相关API请求。</p><p><strong>请勿同时运行新旧版 QD 框架, 或将不同运行中的 QD 容器数据库映射为同一文件。</strong></p></blockquote><h2 id="源码部署" tabindex="-1">源码部署 <a class="header-anchor" href="#源码部署" aria-label="Permalink to &quot;源码部署&quot;">​</a></h2><ol><li><p><strong>Version &gt;= python3.8</strong></p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 请先cd到框架源码根目录</span></span>
<span class="line"><span style="color:#FFCB6B;">pip3</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-r</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">requirements.txt</span></span></code></pre></div></li><li><p><strong>修改相关设置</strong></p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 执行以下命令复制配置文件</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 修改 local_config.py 文件的内容不受通过 git 更新源码的影响</span></span>
<span class="line"><span style="color:#FFCB6B;">cp</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">config.py</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">local_config.py</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 根据需求和配置说明修改配置文件或环境变量值</span></span>
<span class="line"><span style="color:#FFCB6B;">vi</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">local_config.py</span></span></code></pre></div></li><li><p><strong>启动</strong></p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">python</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./run.py</span></span></code></pre></div></li><li><p><strong>访问</strong></p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 访问网页</span></span>
<span class="line"><span style="color:#FFCB6B;">http://localhost:8923/</span></span></code></pre></div><blockquote><p>如果您使用的是源码部署方式，请手动将模板中 <code>http://localhost/</code> 形式的 api 请求改为 <code>api://</code> 或 <code>http://localhost:8923/</code> ，以便正确完成相关API 请求。</p><p>模板需要发布才会在「公开模板」中展示, 你需要管理员权限在「我的发布请求」中审批通过。</p></blockquote></li></ol><h2 id="设置管理员" tabindex="-1">设置管理员 <a class="header-anchor" href="#设置管理员" aria-label="Permalink to &quot;设置管理员&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">python</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./chrole.py</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">your@email.address</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">admin</span></span></code></pre></div><blockquote><p>首位注册用户默认为管理员, 需要先登出再登陆后才能获得完整管理员权限</p></blockquote><h2 id="配置环境变量" tabindex="-1">配置环境变量 <a class="header-anchor" href="#配置环境变量" aria-label="Permalink to &quot;配置环境变量&quot;">​</a></h2><table><thead><tr><th style="text-align:center;">变量名</th><th style="text-align:center;">是否必须</th><th style="text-align:center;">默认值</th><th style="text-align:center;">说明</th></tr></thead><tbody><tr><td style="text-align:center;">BIND</td><td style="text-align:center;">否</td><td style="text-align:center;">0.0.0.0</td><td style="text-align:center;">监听地址</td></tr><tr><td style="text-align:center;">PORT</td><td style="text-align:center;">否</td><td style="text-align:center;">8923</td><td style="text-align:center;">监听端口</td></tr><tr><td style="text-align:center;">QIANDAO_DEBUG</td><td style="text-align:center;">否</td><td style="text-align:center;">False</td><td style="text-align:center;">是否启用Debug模式</td></tr><tr><td style="text-align:center;">WORKER_METHOD</td><td style="text-align:center;">否</td><td style="text-align:center;">Queue</td><td style="text-align:center;">任务定时执行方式, <br>默认为 Queue, 可选 Queue 或 Batch, <br>Batch 模式为旧版定时任务执行方式, 性能较弱, <br><strong>建议仅当 Queue 定时执行模式失效时使用</strong></td></tr><tr><td style="text-align:center;">MULTI_PROCESS</td><td style="text-align:center;">否</td><td style="text-align:center;">False</td><td style="text-align:center;">(实验性)是否启用多进程模式, <br>Windows平台无效</td></tr><tr><td style="text-align:center;">AUTO_RELOAD</td><td style="text-align:center;">否</td><td style="text-align:center;">False</td><td style="text-align:center;">是否启用自动热加载, <br>MULTI_PROCESS=True时无效</td></tr><tr><td style="text-align:center;">ENABLE_HTTPS</td><td style="text-align:center;">否</td><td style="text-align:center;">False</td><td style="text-align:center;">发送的邮件链接启用HTTPS, <br>非框架前端使用HTTPS, 如果前端需要HTTPS,请使用反向代理.</td></tr><tr><td style="text-align:center;">DOMAIN</td><td style="text-align:center;">否</td><td style="text-align:center;">qiandao.today</td><td style="text-align:center;">指定访问域名, <br><strong>(建议修改)</strong>, 否则通过邮件重置密码等功能无效</td></tr><tr><td style="text-align:center;">AES_KEY</td><td style="text-align:center;">否</td><td style="text-align:center;">binux</td><td style="text-align:center;">AES加密密钥, <strong>(强烈建议修改)</strong></td></tr><tr><td style="text-align:center;">COOKIE_SECRET</td><td style="text-align:center;">否</td><td style="text-align:center;">binux</td><td style="text-align:center;">cookie加密密钥, <strong>(强烈建议修改)</strong></td></tr><tr><td style="text-align:center;">COOKIE_DAY</td><td style="text-align:center;">否</td><td style="text-align:center;">5</td><td style="text-align:center;">Cookie在客户端中保留的天数</td></tr><tr><td style="text-align:center;">DB_TYPE</td><td style="text-align:center;">否</td><td style="text-align:center;">sqlite3</td><td style="text-align:center;">需要使用MySQL时设置为&#39;mysql&#39;</td></tr><tr><td style="text-align:center;">JAWSDB_MARIA_URL</td><td style="text-align:center;">否</td><td style="text-align:center;">&#39;&#39;</td><td style="text-align:center;">需要使用MySQL时, <br>设置为 (mysql://用户名:密码@hostname:port/数据库名?auth_plugin=)</td></tr><tr><td style="text-align:center;">QIANDAO_SQL_ECHO</td><td style="text-align:center;">否</td><td style="text-align:center;">False</td><td style="text-align:center;">是否启用 SQLAlchmey 的日志输出, 默认为 False, <br>设置为 True 时, 会在控制台输出 SQL 语句, <br>允许设置为 debug 以启用 debug 模式</td></tr><tr><td style="text-align:center;">QIANDAO_SQL_LOGGING_NAME</td><td style="text-align:center;">否</td><td style="text-align:center;">QD.sql_engine</td><td style="text-align:center;">SQLAlchmey 日志名称, 默认为 &#39;QD.sql_engine&#39;</td></tr><tr><td style="text-align:center;">QIANDAO_SQL_LOGGING_LEVEL</td><td style="text-align:center;">否</td><td style="text-align:center;">Warning</td><td style="text-align:center;">SQLAlchmey 日志级别, 默认为 &#39;Warning&#39;</td></tr><tr><td style="text-align:center;">QIANDAO_SQL_ECHO_POOL</td><td style="text-align:center;">否</td><td style="text-align:center;">True</td><td style="text-align:center;">是否启用 SQLAlchmey 的连接池日志输出, 默认为 True, <br>允许设置为 debug 以启用 debug 模式</td></tr><tr><td style="text-align:center;">QIANDAO_SQL_LOGGING_POOL_NAME</td><td style="text-align:center;">否</td><td style="text-align:center;">QD.sql_pool</td><td style="text-align:center;">SQLAlchmey 连接池日志名称, 默认为 &#39;QD.sql_pool&#39;</td></tr><tr><td style="text-align:center;">QIANDAO_SQL_LOGGING_POOL_LEVEL</td><td style="text-align:center;">否</td><td style="text-align:center;">Warning</td><td style="text-align:center;">SQLAlchmey 连接池日志级别, 默认为 &#39;Warning&#39;</td></tr><tr><td style="text-align:center;">QIANDAO_SQL_POOL_SIZE</td><td style="text-align:center;">否</td><td style="text-align:center;">10</td><td style="text-align:center;">SQLAlchmey 连接池大小, 默认为 10</td></tr><tr><td style="text-align:center;">QIANDAO_SQL_MAX_OVERFLOW</td><td style="text-align:center;">否</td><td style="text-align:center;">50</td><td style="text-align:center;">SQLAlchmey 连接池最大溢出, 默认为 50</td></tr><tr><td style="text-align:center;">QIANDAO_SQL_POOL_PRE_PING</td><td style="text-align:center;">否</td><td style="text-align:center;">True</td><td style="text-align:center;">是否在连接池获取连接前, <br>先ping一下, 默认为 True</td></tr><tr><td style="text-align:center;">QIANDAO_SQL_POOL_RECYCLE</td><td style="text-align:center;">否</td><td style="text-align:center;">3600</td><td style="text-align:center;">SQLAlchmey 连接池回收时间, 默认为 3600</td></tr><tr><td style="text-align:center;">QIANDAO_SQL_POOL_TIMEOUT</td><td style="text-align:center;">否</td><td style="text-align:center;">60</td><td style="text-align:center;">SQLAlchmey 连接池超时时间, 默认为 60</td></tr><tr><td style="text-align:center;">QIANDAO_SQL_POOL_USE_LIFO</td><td style="text-align:center;">否</td><td style="text-align:center;">True</td><td style="text-align:center;">SQLAlchmey 是否使用 LIFO 算法, 默认为 True</td></tr><tr><td style="text-align:center;">REDISCLOUD_URL</td><td style="text-align:center;">否</td><td style="text-align:center;">&#39;&#39;</td><td style="text-align:center;">需要使用Redis或RedisCloud时, <br>设置为 <a href="http://rediscloud:%E5%AF%86%E7%A0%81@hostname:port" target="_blank" rel="noreferrer">http://rediscloud:密码@hostname:port</a></td></tr><tr><td style="text-align:center;">REDIS_DB_INDEX</td><td style="text-align:center;">否</td><td style="text-align:center;">1</td><td style="text-align:center;">默认为1</td></tr><tr><td style="text-align:center;">QIANDAO_EVIL</td><td style="text-align:center;">否</td><td style="text-align:center;">500</td><td style="text-align:center;">(限Redis连接已开启)登录用户或IP在1小时内 <br>分数 = 操作失败(如登录, 验证, 测试等操作)次数 * 相应惩罚分值 <br>分数达到evil上限后自动封禁直至下一小时周期</td></tr><tr><td style="text-align:center;">EVIL_PASS_LAN_IP</td><td style="text-align:center;">否</td><td style="text-align:center;">True</td><td style="text-align:center;">是否关闭本机私有IP地址用户及Localhost_API请求的evil限制</td></tr><tr><td style="text-align:center;">TRACEBACK_PRINT</td><td style="text-align:center;">否</td><td style="text-align:center;">False</td><td style="text-align:center;">是否启用在控制台日志中打印Exception的TraceBack信息</td></tr><tr><td style="text-align:center;">PUSH_PIC_URL</td><td style="text-align:center;">否</td><td style="text-align:center;"><a href="https://fastly.jsdelivr.net/gh/qd-today/qd@master/web/static/img/push_pic.png" target="_blank" rel="noreferrer">push_pic.png</a></td><td style="text-align:center;">默认为<a href="https://fastly.jsdelivr.net/gh/qd-today/qd@master/web/static/img/push_pic.png" target="_blank" rel="noreferrer">push_pic.png</a></td></tr><tr><td style="text-align:center;">PUSH_BATCH_SW</td><td style="text-align:center;">否</td><td style="text-align:center;">True</td><td style="text-align:center;">是否允许开启定期推送 QD 任务日志, 默认为True</td></tr><tr><td style="text-align:center;">MAIL_SMTP</td><td style="text-align:center;">否</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">邮箱SMTP服务器</td></tr><tr><td style="text-align:center;">MAIL_PORT</td><td style="text-align:center;">否</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">邮箱SMTP服务器端口</td></tr><tr><td style="text-align:center;">MAIL_USER</td><td style="text-align:center;">否</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">邮箱用户名</td></tr><tr><td style="text-align:center;">MAIL_PASSWORD</td><td style="text-align:center;">否</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">邮箱密码</td></tr><tr><td style="text-align:center;">MAIL_FROM</td><td style="text-align:center;">否</td><td style="text-align:center;">MAIL_USER</td><td style="text-align:center;">发送时使用的邮箱，默认与MAIL_USER相同</td></tr><tr><td style="text-align:center;">MAIL_DOMAIN</td><td style="text-align:center;">否</td><td style="text-align:center;">mail.qd.today</td><td style="text-align:center;">邮箱域名,没啥用, 使用的DOMAIN</td></tr><tr><td style="text-align:center;">PROXIES</td><td style="text-align:center;">否</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">全局代理域名列表,用&quot;</td></tr><tr><td style="text-align:center;">PROXY_DIRECT_MODE</td><td style="text-align:center;">否</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">全局代理黑名单模式,默认不启用 <br>&quot;url&quot;为网址匹配模式;&quot;regexp&quot;为正则表达式匹配模式</td></tr><tr><td style="text-align:center;">PROXY_DIRECT</td><td style="text-align:center;">否</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">全局代理黑名单匹配规则</td></tr><tr><td style="text-align:center;">USE_PYCURL</td><td style="text-align:center;">否</td><td style="text-align:center;">True</td><td style="text-align:center;">是否启用Pycurl模组</td></tr><tr><td style="text-align:center;">ALLOW_RETRY</td><td style="text-align:center;">否</td><td style="text-align:center;">True</td><td style="text-align:center;">在Pycurl环境下部分请求可能导致Request错误时, <br>自动修改冲突设置并重发请求</td></tr><tr><td style="text-align:center;">DNS_SERVER</td><td style="text-align:center;">否</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">通过Curl使用指定DNS进行解析(仅支持Pycurl环境), <br>如 8.8.8.8</td></tr><tr><td style="text-align:center;">CURL_ENCODING</td><td style="text-align:center;">否</td><td style="text-align:center;">True</td><td style="text-align:center;">是否允许使用Curl进行Encoding操作</td></tr><tr><td style="text-align:center;">CURL_CONTENT_LENGTH</td><td style="text-align:center;">否</td><td style="text-align:center;">True</td><td style="text-align:center;">是否允许Curl使用Headers中自定义Content-Length请求</td></tr><tr><td style="text-align:center;">NOT_RETRY_CODE</td><td style="text-align:center;">否</td><td style="text-align:center;"><a href="https://github.com/qd-today/qd/blob/master/config.py" target="_blank" rel="noreferrer">详见配置</a>...</td><td style="text-align:center;"><a href="https://github.com/qd-today/qd/blob/master/config.py" target="_blank" rel="noreferrer">详见配置</a>...</td></tr><tr><td style="text-align:center;">EMPTY_RETRY</td><td style="text-align:center;">否</td><td style="text-align:center;">True</td><td style="text-align:center;"><a href="https://github.com/qd-today/qd/blob/master/config.py" target="_blank" rel="noreferrer">详见配置</a>...</td></tr><tr><td style="text-align:center;">USER0ISADMIN</td><td style="text-align:center;">否</td><td style="text-align:center;">True</td><td style="text-align:center;">第一个注册用户为管理员，False关闭</td></tr><tr><td style="text-align:center;">EXTRA_ONNX_NAME</td><td style="text-align:center;">否</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">config目录下自定义ONNX文件名<br>(不填 &quot;.onnx&quot; 后缀)<br>多个onnx文件名用&quot;|&quot;分隔</td></tr><tr><td style="text-align:center;">EXTRA_CHARSETS_NAME</td><td style="text-align:center;">否</td><td style="text-align:center;">&quot;&quot;</td><td style="text-align:center;">config目录下自定义ONNX对应自定义charsets.json文件名<br>(不填 &quot;.json&quot; 后缀)<br>多个json文件名用&quot;|&quot;分隔</td></tr></tbody></table><blockquote><p>详细信息请查阅<a href="https://github.com/qd-today/qd/blob/master/config.py" target="_blank" rel="noreferrer">config.py</a></p></blockquote>`,23),r=[a];function o(d,c,p,i,y,g){return e(),n("div",null,r)}const h=t(s,[["render",o]]);export{C as __pageData,h as default};
