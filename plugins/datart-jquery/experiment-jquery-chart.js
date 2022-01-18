/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import JQueryIcon from "./icons8-jquery.svg";

export function JQueryEasyUIChart({ dHelper }) {
  let url;
  let $ = {};
  return {
    config: {
      datas: [],
      styles: [
        {
          label: "label",
          key: "label",
          comType: "group",
          rows: [
            {
              label: "name",
              key: "name",
              default: "Friends",
              comType: "input",
            },
            {
              label: "font",
              key: "font",
              comType: "font",
              default: {
                fontFamily: "PingFang SC",
                fontSize: "24",
                fontWeight: "normal",
                fontStyle: "normal",
                color: "yellow",
              },
            },
          ],
        },
      ],
      i18ns: [
        {
          lang: "zh-CN",
          translation: {
            label: "标签",
            name: "你的姓名",
          },
        },
        {
          lang: "en-US",
          translation: {
            label: "Label",
            name: "Your Name",
          },
        },
      ],
    },
    isISOContainer: "experiment-jquery-chart",
    dependency: [
      "https://www.jeasyui.com/easyui/themes/default/easyui.css",
      "https://www.jeasyui.com/easyui/themes/icon.css",
      "https://www.jeasyui.com/easyui/themes/color.css",
      "https://www.jeasyui.com/easyui/demo/demo.css",
      "https://www.jeasyui.com/easyui/jquery.min.js",
      "https://www.jeasyui.com/easyui/jquery.easyui.min.js",
    ],
    meta: {
      id: "experiment-jquery-chart",
      name: "[Experiment] JQuery Chart",
      icon: JQueryIcon,
      requirements: [
        {
          group: null,
          aggregate: null,
        },
      ],
    },

    onMount(options, context) {
      const node = context.document.createElement("div");
      node.setAttribute("id", this.nodeId);
      node.innerHTML = this.getTemplate();
      if (context.window.$) {
        $ = context.window.$;
        context.window.newUser = this.newUser;
        context.window.editUser = this.editUser;
        context.window.saveUser = this.saveUser;
        context.window.destroyUser = this.destroyUser;
        context.document.getElementById(options.containerId).appendChild(node);
      }
    },

    onUpdated(options, context) {
      if (!this.isMatchRequirement(options.config)) {
        return;
      }

      // const name = this.getInfo(options?.config?.styles);
      // this.chart.$set(this.chart.person, "name", name);
    },

    onUnMount() {
      // this.chart && this.chart.dispose();
    },

    onResize(opt, context) {
      // this.chart && this.chart.resize(context);
    },

    getInfo(styleConfigs) {
      const name = dHelper.getValue(styleConfigs, ["label", "name"]);
      return name;
    },

    getTemplate() {
      return `
      <h2>Basic CRUD Application</h2>
    <p>Click the buttons on datagrid toolbar to do crud actions.</p>
    
    <table id="dg" title="My Users" class="easyui-datagrid" style="width:700px;height:250px"
            url="get_users.php"
            toolbar="#toolbar" pagination="true"
            rownumbers="true" fitColumns="true" singleSelect="true">
        <thead>
            <tr>
                <th field="firstname" width="50">First Name</th>
                <th field="lastname" width="50">Last Name</th>
                <th field="phone" width="50">Phone</th>
                <th field="email" width="50">Email</th>
            </tr>
        </thead>
    </table>
    <div id="toolbar">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newUser()">New User</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editUser()">Edit User</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="destroyUser()">Remove User</a>
    </div>
    
    <div id="dlg" class="easyui-dialog" style="width:400px" data-options="closed:true,modal:true,border:'thin',buttons:'#dlg-buttons'">
        <form id="fm" method="post" novalidate style="margin:0;padding:20px 50px">
            <h3>User Information</h3>
            <div style="margin-bottom:10px">
                <input name="firstname" class="easyui-textbox" required="true" label="First Name:" style="width:100%">
            </div>
            <div style="margin-bottom:10px">
                <input name="lastname" class="easyui-textbox" required="true" label="Last Name:" style="width:100%">
            </div>
            <div style="margin-bottom:10px">
                <input name="phone" class="easyui-textbox" required="true" label="Phone:" style="width:100%">
            </div>
            <div style="margin-bottom:10px">
                <input name="email" class="easyui-textbox" required="true" validType="email" label="Email:" style="width:100%">
            </div>
        </form>
    </div>
    <div id="dlg-buttons">
        <a href="javascript:void(0)" class="easyui-linkbutton c6" iconCls="icon-ok" onclick="saveUser()" style="width:90px">Save</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')" style="width:90px">Cancel</a>
    </div>
      `;
    },

    newUser() {
      $("#dlg").dialog("open").dialog("center").dialog("setTitle", "New User");
      $("#fm").form("clear");
      url = "save_user.php";
    },
    editUser() {
      var row = $("#dg").datagrid("getSelected");
      if (row) {
        $("#dlg")
          .dialog("open")
          .dialog("center")
          .dialog("setTitle", "Edit User");
        $("#fm").form("load", row);
        url = "update_user.php?id=" + row.id;
      }
    },
    saveUser() {
      $("#fm").form("submit", {
        url: url,
        iframe: false,
        onSubmit: function () {
          return $(this).form("validate");
        },
        success: function (result) {
          var result = eval("(" + result + ")");
          if (result.errorMsg) {
            $.messager.show({
              title: "Error",
              msg: result.errorMsg,
            });
          } else {
            $("#dlg").dialog("close"); // close the dialog
            $("#dg").datagrid("reload"); // reload the user data
          }
        },
      });
    },
    destroyUser() {
      var row = $("#dg").datagrid("getSelected");
      if (row) {
        $.messager.confirm(
          "Confirm",
          "Are you sure you want to destroy this user?",
          function (r) {
            if (r) {
              $.post(
                "destroy_user.php",
                { id: row.id },
                function (result) {
                  if (result.success) {
                    $("#dg").datagrid("reload"); // reload the user data
                  } else {
                    $.messager.show({
                      // show error message
                      title: "Error",
                      msg: result.errorMsg,
                    });
                  }
                },
                "json"
              );
            }
          }
        );
      }
    },
  };
}
