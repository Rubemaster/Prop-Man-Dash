// Minimal re-implementation of eXtplorer v2.1.15's viewport, built from the
// same real ExtJS3 widgets and icon set as the original scripts/application.js.php,
// but with no PHP/AJAX backend -- folders are read from this app's own
// /api/property-entries (same-origin, so the Clerk session cookie carries
// over automatically). Files-per-folder are wired up later.

Ext.BLANK_IMAGE_URL = "scripts/extjs3/resources/images/default/s.gif";

Ext.onReady(function () {
	Ext.QuickTips.init();

	var isProjects = new URLSearchParams(window.location.search).get("context") === "projects";
	var emptyLabel = isProjects ? "No project history" : "No result files";

	var fileGrid = new Ext.Panel({
		region: "center",
		layout: "fit",
		html: '<div style="padding:20px;color:#777;font-style:italic;">' + emptyLabel + '.</div>',
	});

	var statusBar = new Ext.ux.StatusBar({
		region: "south",
		height: 22,
		defaultText: "0 object(s)",
	});

	var root = new Ext.tree.TreeNode({
		text: isProjects ? "Projects" : "Results",
		id: "root",
		expanded: true,
		draggable: false,
		allowDrop: false,
	});

	var tree = new Ext.tree.TreePanel({
		region: "west",
		title: "Directory Tree",
		width: 230,
		split: true,
		autoScroll: true,
		containerScroll: true,
		rootVisible: true,
		root: root,
		listeners: {
			click: function (node) {
				statusBar.setText(node === root ? properties.length + " object(s)" : "0 object(s)");
				fileGrid.body.update(
					'<div style="padding:20px;color:#777;font-style:italic;">' +
						emptyLabel +
						' in "' +
						Ext.util.Format.htmlEncode(node.text) +
						'".</div>'
				);
			},
		},
	});

	var toolbar = new Ext.Toolbar({
		items: [
			{
				icon: "images/_home.png",
				cls: "x-btn-text-icon",
				text: "Home",
				handler: function () {
					root.select();
				},
			},
			{
				icon: "images/_reload.png",
				cls: "x-btn-text-icon",
				text: "Reload",
				handler: function () {
					loadProperties();
				},
			},
		],
	});

	new Ext.Viewport({
		layout: "border",
		items: [
			{
				xtype: "panel",
				region: "north",
				height: 32,
				tbar: toolbar,
			},
			tree,
			{
				region: "center",
				layout: "border",
				items: [fileGrid, statusBar],
			},
		],
	});

	var properties = [];

	function loadProperties() {
		root.removeAll();
		fetch("/api/property-entries?t=" + Date.now(), { cache: "no-store" })
			.then(function (res) {
				return res.json();
			})
			.then(function (data) {
				properties = data.properties || [];
				properties.forEach(function (p) {
					// No `leaf: true` -- ExtJS3's tree renders non-leaf nodes with
					// the standard folder icon by default, which is what we want
					// for a property "folder" (leaf nodes get a plain file icon).
					root.appendChild(
						new Ext.tree.TreeNode({
							text: p.address || "(untitled property)",
							id: "prop-" + p.submissionId,
						})
					);
				});
				statusBar.setText(properties.length + " object(s)");
			})
			.catch(function () {
				statusBar.setText("Could not load properties");
			});
	}

	loadProperties();
});
