import Vue from 'vue';
import VueAlertify from 'vue-alertify';
 
Vue.use(VueAlertify);
 
var vm = new Vue({
  el: '#main',
  methods: {
    success: function() {
      this.$alertify.success('success');
    },
    alert: function() {
      this.$alertify.alert('This is alert', () =>
        this.$alertify.warning('alert is closed')
      );
    },
    alertWithTitle: function() {
      this.$alertify.alert('alert title', 'This is alert', () =>
        this.$alertify.warning('alert is closed')
      );
    },
    confirm: function() {
      this.$alertify.confirm(
        'This is comfirm',
        () => this.$alertify.success('ok'),
        () => this.$alertify.error('cancelar')
      );
    },
    confirmWithTitle: function() {
      this.$alertify.confirm(
        'confirm title',
        'This is comfirm',
        () => this.$alertify.success('ok'),
        () => this.$alertify.error('cancelar')
      );
    },
    prompt: function() {
      this.$alertify.prompt(
        'This is prompt',
        'default value',
        (evt, value) => this.$alertify.success('ok: ' + value),
        () => this.$alertify.error('cancelar')
      );
    },
    promptWithTitle: function() {
      this.$alertify.promptWithTitle(
        'prompt title',
        'This is prompt',
        'default value',
        (evt, value) => this.$alertify.success('ok: ' + value),
        () => this.$alertify.error('cancelar')
      );
    },
    promptWithTypeColor: function() {
      this.$alertify
        .promptWithTitle(
          'prompt title',
          'This is prompt',
          'default value',
          (evt, value) => this.$alertify.success('ok: ' + value),
          () => this.$alertify.error('cancelar')
        )
        .set('type', 'color');
    },
  },
  mounted: function() {
    setTimeout(() => {
      this.$alertify.success('Hell Alertify');
    }, 500);
  },
});