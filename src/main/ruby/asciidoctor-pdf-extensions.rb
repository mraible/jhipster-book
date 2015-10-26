require 'asciidoctor-pdf' unless defined? ::Asciidoctor::Pdf

module AsciidoctorPdfExtensions
  def layout_title_page doc
      # no title page
  end

  def layout_chapter_title node, title
    if node.id == "dedication" || node.id == "acknowledgements"
      # todo: Add underline of forward-slashes under title
      # todo: Add margin below title, before text
        layout_heading_custom title, align: :center
    elsif node.id.include? "mini-book" # colophon
      # todo: make title font-size same as text, align with bottom of page
      move_down 500
      layout_heading title, size: @theme.base_font_size
    elsif node.id.include? "jhipster" #chapters
      puts node.id
      # todo: add 'Part One|Two|Three' to title and make font name, size and colors match InfoQ
      layout_heading title, align: :right, margin_top: 3
      start_new_page
    else
       # delegate to default implementation
       super
    end
  end

  def layout_heading_custom string, opts = {}
      if (transform = (opts.delete :text_transform) || @text_transform)
          puts 'transforming'
          string = transform_text string, transform
      end
      move_down 100
      puts 'length of title ' + string.length.to_s
      typeset_text string, calc_line_metrics((opts.delete :line_height) || @theme.heading_line_height), {
          inline_format: true
      }.merge(opts)
      move_down 20
  end
end

Asciidoctor::Pdf::Converter.prepend AsciidoctorPdfExtensions
